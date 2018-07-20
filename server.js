//require things we installed
const express = require("express");
const app = express;
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
require ("./db/db");


//middleware
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: false}));

//require controllers
const photoController = require("./controllers/photo.js");
const userController = require("./controllers/user.js");

//set up controller routes
app.use("/photo", photoController);
app.use("/user", userController);

app.get("/", (req, res) => {
	res.render("index.ejs");
});

app.listen(3000, () => {
	console.log("Can you hear me now????");
})