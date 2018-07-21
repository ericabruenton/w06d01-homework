const mongoose = require("mongoose");
const Photo = require("./photo.js");

const userSchema = new mongoose.Schema({
					name: String,
					username: {type: String , unique: true, required: true},
					displayName: {type: String, unique: true, required: true},
					password: {type: String, required: true},
					photos: [Photo.schema]
				});

module.exports = mongoose.model("User", userSchema);