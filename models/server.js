const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
	name: { type: String, minLength: 4, maxLength: 128, required: true},
	description: { type: String, maxLength: 256, required: true },
	members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	channels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }],
	memberCount: { type: Number, default: 0 },
	activeCount: { type: Number, default: 0 },
	createdOn: { type: Date, default: Date.now },
	createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

serverSchema.statics.addMember = async function(memberToAdd) {
	const memberCount = this.memberCount + 1;
	const servers = [...memberToAdd.servers, this._id];
	memberToAdd.update({ servers });
  return await this.update({
  	memberCount,
  	$set: {
  		members: [...members, memberToAdd._id]
  	}
  });
};

serverSchema.statics.removeMember = async function(memberToRemove) {
	const memberCount = this.memberCount - 1;
	const members = this.members.filter(member => member._id !== memberToRemove._id);
  return await this.update({ memberCount, members });
};

module.exports = new mongoose.model('Server', serverSchema);