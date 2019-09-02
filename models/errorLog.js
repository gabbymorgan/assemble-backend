const mongoose = require("mongoose");

const errorLogSchema = new mongoose.Schema({
	createdOn: { type: mongoose.Schema.Types.Date, default: Date.now },
	body: { type: Object },
	headers: { type: Object || String },
	error: { type: Object },
	request: String,
	hostname: String,
	ip: String,
	query: Object,
	secure: Boolean
});

module.exports = new mongoose.model("ErrorLog", errorLogSchema);
