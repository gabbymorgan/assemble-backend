const mongoose = require('mongoose');

const channelMessageSchema = new mongoose.Schema({
	name: { type: String, minLength: 4, maxLength: 128 },
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	createdOn: { type: Date, default: Date.now }
});

module.exports = new mongoose.model('ChannelMessage', channelMessageSchema);