const mongoose = require("mongoose");
const Photo = require("./photo.js");

const userSchema = new mongoose.Schema({
					name: String,
					username: {type: String , unique: true},
					password: String,
					photos: [Photo.schema]
				});

module.exports = mongoose.model("User", userSchema);