const express = require('express');
const mongoose = require('mongoose');
const uploader = require('./uploader.js');

const router = express.Router();
const path = '/images/experience';

const upload = uploader.upload(path).single('image');

const validUser = require('./users.js').validUser;

const experienceSchema = new mongoose.Schema({
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

experienceSchema.pre(/^find/, function() {
    this.where({isDeleted: false});
});

const Experience = mongoose.model('Experience', experienceSchema);

router.get('/', async (req, res) => {
    try {
        const experience = await Experience.find();
        res.send(experience);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const experience = await Experience.findOne({
            _id: req.params.id
        });

        if (!experience) {
            res.status(400).send({
                message: "Cannot find experience with id " + req.params.id
            });
        }

        res.send(experience);
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
        const experience = new Experience({
            name: req.body.name,
            description: req.body.description,
            image: req.file ? path + '/' + req.file.filename : '',
            to: req.body.to,
            from: req.body.from
        });

        await experience.save();

        res.send(experience);
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
        const experience = await Experience.findOne({
            _id: req.params.id
        });

        if (!experience) {
            return res.send(400).send({
                message: "Cannot find experience with id " + req.params.id
            })
        }

        const oldImage = experience.image;

        experience.name = req.body.name;
        experience.description = req.body.description;
        experience.to = req.body.to;
        experience.from = req.body.from;
        experience.image = req.file ? path + '/' + req.file.filename : experience.image;

        if (experience.image != oldImage) {
            uploader.delete(oldImage);
        }

        await experience.save();

        res.send(experience);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
})

router.delete('/:id', validUser(['admin']), async (req, res) => {
    try {
        const experience = await Experience.findOne({
            _id: req.params.id                
        });

        if (!experience) {
            console.log("Could not find experience with id " + req.params.id)
            return res.status(400).send({
                message: "Could not find experience with id " + req.params.id
            });
        }

        //Admins can do hard deletes. Other wise just mark it as deleted
        if (req.query.hard === 'true') {
            uploader.delete(experience.image);
            await experience.delete();
            console.log('Hard deleted experience ' + experience._id);
        } else {
            experience.isDeleted = true;
            await experience.save();
            console.log('Deleted experience ' + experience._id);            
        }

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

module.exports = {
    model: Experience,
    routes: router
}