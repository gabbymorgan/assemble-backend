const mongoose = require("mongoose");

const directMessageSchema = new mongoose.Schema({
	sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	createdOn: { type: mongoose.Schema.Types.Date, default: Date.now }
});

module.exports = new mongoose.model("DirectMessage", directMessageSchema);
