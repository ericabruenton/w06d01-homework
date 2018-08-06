const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Photo = require("../models/photo.js");

router.get("/", async (req, res, next) => {

           try  { 
            console.log("users found");
            const foundUser = await User.find();

            res.render("users/index.ejs", {
              users: foundUser
            });

          	} catch (err){
          		console.log("Error");
            	next(err);
          	}
});

router.get("/new", (req, res) => {
	res.render("users/new.ejs");
});

router.get("/:id", async (req, res) => {
  
  try {
    const foundUser = await User.findById(req.params.id);

    res.render("users/show.ejs", {
      user: foundUser
    });

  } catch (err) {
    console.log("Error");
  }
});

router.get("/:id/edit", async (req, res) => {

  try {
    const foundUser = await User.findById(req.params.id);

    res.render("users/edit.ejs", {
      user: foundUser
    });
    
  } catch (err) {
    console.log("Error");
  }
});

router.put("/:id", async (req, res) => {

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    console.log(updatedUser, "this is updatedUser");
    res.redirect("/users");

  } catch (err) {
    console.log("Error");
  }  
});

router.post("/", async (req, res) => {

  try {
    const createdUser = await User.create(req.body);
    console.log(createdUser, " this is the createdUser");
    res.redirect("/users");

  } catch (err) {
    console.log("Error");
  }
});

router.delete("/:id", async (req, res) => {

  try {
    const deletedUser = User.findByIdAndRemove(req.params.id);
    console.log(deletedUser, ' this is deletedUser');
    const photoIds = [];
    for(let i = 0; i < deletedUser.photos.length; i++){
      photoIds.push(deletedUser.photos[i].id);
    }

    Photo.remove({
      _id: { $in: photoIds}
    })
      res.redirect("/users");

  } catch (err) {
    console.log("Error");
  }
});

module.exports = router;

