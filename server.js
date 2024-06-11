require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./middleware/dbConnectionMiddleware');

const authController = require('./routes/authController');
const securedController = require('./routes/networkController');

app.use(cors()); 
app.use(express.json());

app.use('/auth', authController);

app.listen(3000, () => console.log('Server started on port 3000'));
