const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const multer = require('multer');
const upload = multer();

router.post('/register', upload.none(), async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    let client_id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({username, password: hashedPassword, client_id});
    await user.save();
    res.send({client_id});
});

router.post('/aqquire-token', upload.none(), async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
        return res.sendStatus(401);
    }
    const token = jwt.sign({_id: user._id, client_id: user.client_id}, process.env.SECRET_KEY);
    res.send({token, client_id: user.client_id});
});

router.post('/verify-token', upload.none(), async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader);

        if (!authHeader) {
            return res.sendStatus(401);
        }

        const token = authHeader.split(' ')[1]; // Assuming the token is in the format "Bearer <token>"
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({_id: decoded._id, client_id: decoded.client_id});

        if (!user) {
            return res.sendStatus(401);
        }

        res.send({client_id: user.client_id});
    } catch (error) {
        console.error(error);
        res.sendStatus(401);
    }
});

module.exports = router;
