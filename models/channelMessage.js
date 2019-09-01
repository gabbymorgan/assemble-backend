const mongoose = require('mongoose');


const channelMessageSchema = new mongoose.Schema({
	name: { type: String, minLength: 4, maxLength: 128 },
	members: [{ type: mongoose.Schema.Types.ObjectId }]
});

module.exports = new mongoose.model('ChannelMessage', channelMessageSchema);