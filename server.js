const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
require ("./db/db");

app.use(bodyParser.urlencoded({extended: false})); 
app.use(methodOverride("_method")); 
app.use(express.static(__dirname + "/public"));		

const photoController = require("./controllers/photo.js");
const userController = require("./controllers/user.js");
app.use("/photos", photoController);//Page will route with /photos
app.use("/users", userController);//Page will route with /users

app.get("/", (req, res) => {
	res.render("index.ejs");
});

app.listen(3000, () => {
	console.log("Can you hear me now????");
});