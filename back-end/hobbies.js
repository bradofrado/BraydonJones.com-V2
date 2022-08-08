const express = require('express');
const mongoose = require('mongoose');
const uploader = require('./uploader.js');

const router = express.Router();
const path = '/images/hobbies';

const upload = uploader.upload(path).single('image');

const validUser = require('./users.js').validUser;

const hobbiesSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    isDeleted: {
        type: Boolean,
        default: false
    }
});

hobbiesSchema.pre(/^find/, function() {
    this.where({isDeleted: false});
});

const Hobby = mongoose.model('Hobby', hobbiesSchema);

router.get('/', async (req, res) => {
    try {
        const hobbies = await Hobby.find();
        res.send(hobbies);
    } catch(error) {
        console.log(error);
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
        const hobby = new Hobby({
            name: req.body.name,
            description: req.body.description,
            image: req.file ? path + '/' + req.file.filename : '',
            to: req.body.to,
            from: req.body.from
        });

        await hobby.save();

        res.send(hobby);
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
        const hobby = await Hobby.findOne({
            _id: req.params.id
        });

        if (!hobby) {
            return res.send(400).send({
                message: "Cannot find hobby with id " + req.params.id
            })
        }

        const oldImage = hobby.image;

        hobby.name = req.body.name;
        hobby.description = req.body.description;
        hobby.image = req.file ? path + '/' + req.file.filename : hobby.image;

        if (hobby.image != oldImage) {
            uploader.delete(oldImage);
        }

        await hobby.save();

        res.send(hobby);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
})

router.delete('/:id', validUser(['admin']), async (req, res) => {
    try {
        const hobby = await Hobby.findOne({
            _id: req.params.id                
        });

        if (!hobby) {
            console.log("Could not find hobby with id " + req.params.id)
            return res.status(400).send({
                message: "Could not find hobby with id " + req.params.id
            });
        }

        //Admins can do hard deletes. Other wise just mark it as deleted
        if (req.query.hard === 'true') {
            uploader.delete(hobby.image);
            await hobby.delete();
            console.log('Hard deleted hobby ' + hobby._id);
        } else {
            hobby.isDeleted = true;
            await hobby.save();
            console.log('Deleted hobby ' + hobby._id);            
        }

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

module.exports = {
    model: Hobby,
    routes: router
}