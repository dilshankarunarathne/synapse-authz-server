const mongoose = require('../middleware/dbConnectionMiddleware');

const UserSchema = new mongoose.Schema({
    client_id: String,
    username: String,
    password: String,
});

module.exports = mongoose.model('User', UserSchema);
