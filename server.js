require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

const authController = require('./routes/authController');

app.use(cors());
app.use(express.json());

app.use('/auth', authController);

app.listen(5000, () => console.log('Server started on port 5000'));
