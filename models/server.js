const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
	name: { type: String, minLength: 4, maxLength: 128 },
	members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = new mongoose.model('Server', serverSchema);