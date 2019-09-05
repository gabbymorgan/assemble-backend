const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const ErrorLogService = require("../services/errorLogService");

const router = express.Router();
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const EXPIRY_INTERVAL = 1000 * 60 * 5; // five minutes

router
	.post("/register", async (req, res) => {
		let { username, password, email } = req.body;
		if (!username || !password || !email) {
			ErrorLogService.logError(req, {
				message: "Missing username, password, or email."
			});
			return res
				.status(400)
				.json({ message: "Username, password, and email required." });
		} else
			try {
				const salt = bcrypt.genSaltSync(10);
				password = bcrypt.hashSync(password, salt);
				const newUser = new User({ username, password, email });
				const savedUser = await newUser.save();
				const payload = {
					sub: savedUser.username,
					exp: Date.now() + EXPIRY_INTERVAL
				};
				const token = jwt.sign(payload, PRIVATE_KEY);
				res.status(200).json({ token });
			} catch (err) {
				ErrorLogService.logError(req, err);
				res.status(500).json({
					message:
						"There was an error with your registration. We're working on it."
				});
			}
	})
	.post("/login", async (req, res) => {
		const { username, password } = req.body;
		if (!username || !password) {
			ErrorLogService.logError(req, {
				message: "Missing username and/or password."
			});
			return res
				.status(400)
				.json({ message: "Username and password required." });
		}
		try {
			const foundUser = await User.findOne({ username });
			if (!foundUser) {
				ErrorLogService.logError(req, { message: "User not found." });
				return res
					.status(400)
					.json({ message: "Incorrect username/password combination." });
			}
			const passwordIsValid = bcrypt.compareSync(password, foundUser.password);
			if (passwordIsValid) {
				const payload = {
					sub: foundUser.username,
					exp: Date.now() + EXPIRY_INTERVAL
				};
				const token = jwt.sign(payload, PRIVATE_KEY);
				res.status(200).json({ token });
			} else {
				ErrorLogService.logError(req, { message: "Incorrect password." });
				res
					.status(400)
					.json({ message: "Incorrect username/password combination." });
			}
		} catch (err) {
			ErrorLogService.logError(req, err);
			res.status(500).json({
				message: "There was an error logging in. We're working on it."
			});
		}
	});

module.exports = router;
