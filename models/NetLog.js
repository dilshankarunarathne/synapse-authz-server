const mongoose = require('../middleware/dbConnectionMiddleware');

const LogSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    clientId: String,
    jobId: String,
    workerId: String,
    logLevel: String,
    logMessage: String,
});

module.exports = mongoose.model('Log', LogSchema);
