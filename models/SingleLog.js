const mongoose = require('../middleware/dbConnectionMiddleware');

const SingleLogSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  clientId: String,
  logLevel: String,
  logMessage: String,
});

module.exports = mongoose.model('SingleLog', SingleLogSchema);
