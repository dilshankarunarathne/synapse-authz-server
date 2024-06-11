const authMiddleware = require('../middleware/authMiddleware');

const express = require('express');
const router = express.Router();

router.post('/db-log', authMiddleware, (req, res) => {
  res.send('Logging was successful'); // TODO: Implement logging
});

router.post('/flat-log', authMiddleware, (req, res) => {
  res.send('Logging was successful'); // TODO: Implement logging
});

module.exports = router;
