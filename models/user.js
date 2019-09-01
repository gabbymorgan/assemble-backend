const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	password: { type: String, required: true, minLength:8, maxLength: 64 },
	username: { type: String, required: true, unique: true, minLength: 8, maxLength: 64 },
	email: { type: String, required: true, unique: true, minLength: 7, maxLength: 64 },
	groups: [{ type: mongoose.Schema.Types.ObjectId }]
});

module.exports = new mongoose.model('User', userSchema);