const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
	name: { type: String, minLength: 4, maxLength: 64 },
	server: { type: mongoose.Schema.Types.ObjectId, ref: 'Server' },
	messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChannelMessage' }]
});

module.exports = new mongoose.model('Channel', channelSchema);