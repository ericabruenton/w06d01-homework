const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
					title: {type: String, required: true}
				});

module.exports = mongoose.model("Photo", userSchema);