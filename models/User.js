const mongoose = require('../middleware/dbConnectionMiddleware');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model('User', UserSchema);
