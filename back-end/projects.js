const express = require('express');
const mongoose = require('mongoose');
const uploader = require('./uploader.js');

const router = express.Router();
const path = '/images/projects';

const validUser = require('./users.js').validUser;

const upload = uploader.upload(path).single('image');

const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    from: Date,
    to: Date,
    image: String,
    isDeleted: {
        type: Boolean,
        default: false
    }
});

projectSchema.pre(/^find/, function() {
    this.where({isDeleted: false});
});

const Project = mongoose.model('Project', projectSchema);

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.send(projects);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const project = await Project.findOne({
            _id: req.params.id
        });

        if (!project) {
            res.status(400).send({
                message: "Cannot find project with id " + req.params.id
            });
        }

        res.send(project);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.post('/', validUser(['admin']), upload, async (req, res) => {
    if (!req.body.name || !req.body.description || !req.body.from || !req.body.to) {
        return res.status(400).send({
            message: "Invalid body parameters"
        });
    }

    try {
        const project = new Project({
            name: req.body.name,
            description: req.body.description,
            image: req.file ? path + '/' + req.file.filename : '',
            to: req.body.to,
            from: req.body.from
        });

        await project.save();

        res.send(project);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
})

router.put('/:id', validUser(['admin']), upload, async (req, res) => {
    if (!req.body.name || !req.body.description || !req.body.from || !req.body.to) {
        return res.status(400).send({
            message: "Invalid body parameters"
        });
    }

    try {
        const project = await Project.findOne({
            _id: req.params.id
        });

        if (!project) {
            return res.send(400).send({
                message: "Cannot find project with id " + req.params.id
            })
        }

        const oldImage = project.image;

        project.name = req.body.name;
        project.description = req.body.description;
        project.to = req.body.to;
        project.from = req.body.from;
        project.image = req.file ? path + '/' + req.file.filename : project.image;

        if (project.image != oldImage) {
            uploader.delete(oldImage);
        }

        await project.save();

        res.send(project);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
})

router.delete('/:id', validUser(['admin']), async (req, res) => {
    try {
        const project = await Project.findOne({
            _id: req.params.id                
        });

        if (!project) {
            console.log("Could not find project with id " + req.params.id)
            return res.status(400).send({
                message: "Could not find project with id " + req.params.id
            });
        }

        //Admins can do hard deletes. Other wise just mark it as deleted
        if (req.query.hard === 'true') {
            uploader.delete(project.image);
            await project.delete();
            console.log('Hard deleted project ' + project._id);
        } else {
            project.isDeleted = true;
            await project.save();
            console.log('Deleted project ' + project._id);            
        }

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

module.exports = {
    model: Project,
    routes: router
}