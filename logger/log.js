const axios = require('axios');

const logServerUrl = 'http://localhost:3000/log';

async function sendLogMessage(message) {
  try {
    const response = await axios.post(logServerUrl, {
      message: message
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Log message sent:', response.data);
  } catch (error) {
    console.error('Error sending log message:', error);
  }
}
