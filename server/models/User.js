const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
});

const UsersModel = mongoose.model('Users', UsersSchema);

module.exports = UsersModel;
