const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Server = require("../models/server");
const ErrorLogService = require("../services/errorLogService");
const ValidationService = require("../services/ValidationService");

const router = express.Router();
const PRIVATE_KEY = process.env.PRIVATE_KEY;

router.post("/mine", async (req, res) => {
	const { token } = req.body;
	try {
		const user = await ValidationService.validateUser(token);
		if (!user) {
			return res.status(401).json({ message: "Unauthorized." })
		}
		const userWithServers = await User.findById(user._id).populate("servers");
		const servers = userWithServers.servers;
		res.status(200).json({ servers })
	} catch (err) {
		ErrorLogService.logError(req, err);
		res.status(500).json({
			message:
				"There was an error finding servers. We're working on it."
		});
	}
})
.post("/search", async (req, res) => {
	const { token, query, queryType } = req.body;
	const allowedQueries = ["name", "description"]
	try {
		const user = await ValidationService.validateUser(token);
		if (!user) {
			return res.status(401).json({ message: "Unauthorized." })
		}
		const servers = await Server.find({ [queryType]: { $regex: query, $options: "i"} });
		res.status(200).json({ servers });
	} catch(err) {
		ErrorLogService.logError(req, err);
		res.status(500).json({
			message:
				"There was an error finding servers. We're working on it."
		});
	}
})
.post("/create", async (req,res) => {
	const { name, description, token } = req.body;
	try {
		const user = await ValidationService.validateUser(token);
		if (!user) {
			return res.status(401).json({ message: "Unauthorized." })
		}
		const newServer = new Server({
			createdBy: user._id,
			name,
			description
		})
		const savedServer = await newServer.save();
		res.status(200).json({ savedServer });
	} catch (err) {
		ErrorLogService.logError(req, err);
		res.status(500).json({
			message:
				"There was an error creating servers. We're working on it."
		});
	} 
})
.post("/join", async (req, res) => {
	const { token, serverId } = req.body;
	try {
		const user = await ValidationService.validateUser(token);
		if (!user) {
			return res.status(401).json({ message: "Unauthorized." })
		}
		const foundServer = await Server.findById(serverId);
		const updatedServer = await foundServer.addMember(user);
		if (updatedServer.error) {
			ErrorLogService.logError(req, updatedServer.error);
			return res.status(500).json({
				message: "There was an error joining the server. We're working on it."
			});
		}
		res.status(200).json({ updatedServer });
	} catch (err) {
		ErrorLogService.logError(req, err);
		res.status(500).json({
			message:
				"There was an error joining the server. We're working on it."
		});
	}
})
.post("/leave", async (req, res) => {
	const { token, serverId } = req.body;
	try {
		const user = await ValidationService.validateUser(token);
		if (!user) {
			return res.status(401).json({ message: "Unauthorized." });
		}
		const foundServer = await Server.findById(serverId);
		const updatedServer = await foundServer.removeMember(user);
		if (updatedServer.error) {
			ErrorLogService.logError(req, updatedServer.error);
			return res.status(500).json({
				message: "There was an error joining the server. We're working on it."
			});
		}
		res.status(200).json({ updatedServer });
	} catch (err) {
		ErrorLogService.logError(req, err);
		res.status(500).json({
			message:
				"There was an error joining the server. We're working on it."
		});
	}
})
.post("/update", (req, res) => {

})
.post("/delete", (req,res) => {

})

module.exports = router;
