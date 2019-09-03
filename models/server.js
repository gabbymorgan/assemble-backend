const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({
	name: { type: String, minLength: 4, maxLength: 128, required: true },
	description: { type: String, maxLength: 256, required: true },
	members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	channels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channel" }],
	memberCount: { type: Number, default: 0 },
	activeCount: { type: Number, default: 0 },
	createdOn: { type: Date, default: Date.now },
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	}
});

serverSchema.methods.addMember = async function(memberToAdd) {
	const retObj = { success: false };
	try {
		memberToAdd.update({
			$addToSet: { servers: this._id }
		});
		const savedServer = await this.update({
			$addToSet: { members: memberToAdd._id},
			memberCount: this.memberCount + 1
		});
		retObj.data = savedServer;
		retObj.success = true;
	} catch (err) {
		retObj.error = err;
	}
	return retObj;
};

serverSchema.methods.removeMember = async function(memberToRemove) {
	const retObj = { success: false };
	try {
		memberToRemove.update({
			$pull: { servers: this._id }
		});
		const savedServer = await this.update({
			$pull: { members: memberToRemove._id},
			memberCount: this.memberCount - 1
		});
		retObj.data = savedServer;
		retObj.success = true;
	} catch (err) {
		retObj.error = err;
	}
	return retObj;
};

module.exports = new mongoose.model("Server", serverSchema);
