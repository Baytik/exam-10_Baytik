const express = require('express');
const path = require('path');
const multer = require('multer');
const nanoid = require('nanoid');
const fs = require('fs');
const fileDb = require('../fileDb');
const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
    const messages = await fileDb.getItems();
    res.send(messages);
});

router.get('/:id', async (req, res) => {
    const message = await fileDb.getItemById();
    Object.keys(message).map((id) => {
        if (req.params.id === message[id].id) {
            const onePost = message.find(item => item.id === message[id].id);
            res.send(onePost)
        }
    });
});

router.post('/', upload.single('image'),  (req, res) => {
    const date = new Date();
    const messageDate = date.toISOString();
    const post = {
      title: req.body.title,
      description: req.body.description,
      datetime: messageDate
    };
    if (req.body.title === '' || req.body.description === '') {
        res.status(400).send({error: 'Please enter message'})
    }
    else {
        if (req.file) {
            post.image = req.file.filename;
        }
     fileDb.addItem(post);
    res.send(post)
    }
});

router.delete('/:id', async (req, res) => {
    const post = await fileDb.deleteItem(req.params.id);
    res.send(post)
});

module.exports = router;