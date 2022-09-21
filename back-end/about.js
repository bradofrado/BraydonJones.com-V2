const express = require('express');
const mongoose = require('mongoose');
const uploader = require('./uploader.js');

const router = express.Router();
const path = '/images/about';

const validUser = require('./users.js').validUser;

const upload = uploader.upload(path).single('image');

const aboutSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    isDeleted: {
        type: Boolean,
        default: false
    }
});

aboutSchema.pre(/^find/, function() {
    this.where({isDeleted: false});
});

const About = mongoose.model('About', aboutSchema);

router.get('/', async (req, res) => {
    try {
        const about = await About.find();
        res.send(about);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const about = await About.findOne({
            _id: req.params.id
        });

        if (!about) {
            res.status(400).send({
                message: "Cannot find about with id " + req.params.id
            });
        }

        res.send(about);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.post('/', validUser(['admin']), upload, async (req, res) => {
    if (!req.body.name || !req.body.description) {
        return res.status(400).send({
            message: "Invalid body parameters"
        });
    }

    try {
        const about = new About({
            name: req.body.name,
            description: req.body.description,
            image: req.file ? path + '/' + req.file.filename : '',
        });

        await about.save();

        res.send(about);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
})

router.put('/:id', validUser(['admin']), upload, async (req, res) => {
    if (!req.body.name || !req.body.description) {
        return res.status(400).send({
            message: "Invalid body parameters"
        });
    }

    try {
        const about = await About.findOne({
            _id: req.params.id
        });

        if (!about) {
            return res.send(400).send({
                message: "Cannot find about with id " + req.params.id
            })
        }
        const oldImage = about.image;

        about.name = req.body.name;
        about.description = req.body.description;
        
        about.image = req.file ? path + '/' + req.file.filename : about.image;

        if (about.image != oldImage) {
            uploader.delete(oldImage);
        }

        await about.save();

        res.send(about);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
})

router.delete('/:id', validUser(['admin']), async (req, res) => {
    try {
        const about = await About.findOne({
            _id: req.params.id                
        });

        if (!about) {
            console.log("Could not find about with id " + req.params.id)
            return res.status(400).send({
                message: "Could not find about with id " + req.params.id
            });
        }

        //Admins can do hard deletes. Other wise just mark it as deleted
        if (req.query.hard === 'true') {
            uploader.delete(about.image);
            await about.delete();
            console.log('Hard deleted about ' + about._id);
        } else {
            about.isDeleted = true;
            await about.save();
            console.log('Deleted about ' + about._id);            
        }

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

module.exports = {
    model: About,
    routes: router
}