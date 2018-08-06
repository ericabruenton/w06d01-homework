const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
					title: {type: String, required: true},
					body: String
				});

module.exports = mongoose.model("Photo", photoSchema);