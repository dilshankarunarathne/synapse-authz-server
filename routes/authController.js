const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer();

const User = require('../models/User');
const sendLogMessage = require('../logger/log'); 

router.use(express.json());

router.post('/register', upload.none(), async (req, res) => {
    sendLogMessage("New user registration requested with: " + req.body);

    const {username, password} = req.body;

    if (!username || !password) {
        sendLogMessage("Malformed register request!");
        return res.status(400).send('Username and password are required');
    }

    let client_id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({username, password: hashedPassword, client_id});
    await user.save();
    sendLogMessage("New user registered successfully with: " + user);
    res.send({client_id});
});

router.post('/aqquire-token', upload.none(), async (req, res) => {
    sendLogMessage("Token request recieved with: " + req.body);

    const user = await User.findOne({username: req.body.username});
    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
        sendLogMessage("Malformed token request!");
        return res.sendStatus(401);
    }
    const token = jwt.sign({_id: user._id, client_id: user.client_id}, process.env.SECRET_KEY);
    sendLogMessage("Token issued successfully with: " + user);
    res.send({token, client_id: user.client_id});
});

router.post('/verify-token', upload.none(), async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader);

        if (!authHeader) {
            sendLogMessage("Token verification failed! No token provided!");
            return res.sendStatus(401);
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({_id: decoded._id, client_id: decoded.client_id});

        if (!user) {
            sendLogMessage("Token verification failed! User not found: " + client_id);
            return res.sendStatus(401);
        }

        sendLogMessage("Token verification successful for user: " + client_id);
        res.send({client_id: user.client_id});
    } catch (error) {
        sendLogMessage(error);
        console.error(error);
        res.sendStatus(401);
    }
});

module.exports = router;
