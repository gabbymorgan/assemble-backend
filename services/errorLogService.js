const ErrorLog = require("../models/errorLog");

const logError = (req, err) => {
	const newErrorLog = new ErrorLog({
		body: req.body,
		hostname: req.hostname,
		ip: req.ip,
		query: req.query,
		secure: req.secure,
		error: err
	});
	newErrorLog.save();
};

module.exports = {
	logError
}