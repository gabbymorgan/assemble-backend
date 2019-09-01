const mongoose = require("mongoose");

const errorLogSchema = new mongoose.Schema({
	time: { type: mongoose.Schema.Types.Date, default: Date.now },
	body: { type: Object },
	headers: { type: Object },
	error: { type: Object },
	request: String,
	hostname: String,
	ip: String,
	query: Object,
	secure: Boolean
});

module.exports = new mongoose.model("ErrorLog", errorLogSchema);
