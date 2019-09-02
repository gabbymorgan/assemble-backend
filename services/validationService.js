const jwt = require("jsonwebtoken");
const User = require("../models/user");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const validateUser = async (token) => {
	try {
		const { sub, exp } = jwt.verify(token, PRIVATE_KEY);
		if (!sub || !exp) {
			return null;
		}
		if (exp < Date.now()) {
			return null;
		} else {
			const foundUser = await User.findOne({ username: sub });
			return foundUser;
		} 
	} catch (err) {
		console.log(err);
	}
}

module.exports = {
	validateUser
}