const mongoose = require('mongoose');


const channelSchema = new mongoose.Schema({
	name: { type: String, minLength: 4, maxLength: 64 }
});

module.exports = new mongoose.model('Channel', channelSchema);