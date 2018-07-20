const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
					title: String
				});

module.exports = mongoose.model("Photo", userSchema);