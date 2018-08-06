const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Photo = require("../models/photo.js");

router.get("/", async (req, res, next) => {

           try  {
            console.log("photos found");
            const foundPhoto = await Photo.find({});

            res.render("photos/index.ejs", {
              photos: foundPhoto
            });

          	} catch (err){
          		console.log("Error");
            	next(err);
          	}
});

router.get("/new", async (req, res, next) => {

  try {
    console.log("new photo");
    const allPhotos = await Photo.find();

    res.render("photos/new.ejs", {
      photos: allPhotos
    });

    } catch (err) {
      console.log("Error");
                next(err);
      
    }
});

router.get("/:id", async (req, res)=>{
  try {
      const findPhoto = Photo.findById(req.params.id);
      const findUser  = User.findOne({"photos._id": req.params.id});

      // Promise All returns an array of the repsonse from DB queries,
      // Using array destructuring to save the corresponding responses as the variables foundPhoto, and foundUser
      // the array destructuring is the const [foundPhoto, foundUser]
      // what this is doing is creating varaibles for each index in the array that is returned from await Promise.all([findPhoto, findUser])
     
      const [foundPhoto, foundUser] = await Promise.all([findPhoto, findUser]);

      res.render("photos/show.ejs", {
        photo: foundPhoto,
        user: foundUser
      });
  } catch (err) {
    next(err);
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
      const findPhoto = Photo.findById(req.params.id);
      const findAllUsers = User.find();
      const findPhotoUser = User.findOne({"photos._id": req.params.id});
      const [foundPhoto, allUsers, foundPhotoUser] = await Promise.all([findPhoto, findAllUsers, findPhotoUser]);
      res.render("photos/edit.ejs", {
            photo: foundPhoto,
            users: allUsers,
            photoUser: foundPhotoUser
          });
  } catch (err) {
      res.send(err);
  }
});

router.post("/", async (req, res)=>{ //this is rendered on the new page
  try {
      const findUser = User.findById(req.body.userId);
      const createPhoto = Photo.create(req.body);
      const [foundUser, createdPhoto] = await Promise.all([findUser, createPhoto]);
      console.log(foundUser, createdPhoto)
      foundUser.photos.push(createdPhoto);

      await foundUser.save();
      res.redirect("/photos");

  } catch(err){
    console.log("Error")
     res.send(err);
  }
});


router.delete("/:id", async (req, res)=>{
try {
      const deletePhoto = Photo.findByIdAndRemove(req.params.id);
      const findUser    = User.findOne({"photos._id": req.params.id});
      const [deletedPhoto, foundUser] = await Promise.all([deletePhoto, findUser]);
      console.log(foundUser, "foundUser")
      foundUser.photos.id(req.params.id).remove();

      await foundUser.save();
      res.redirect("/photos");

  } catch(err){
    console.log(err)
    res.send(err);
  }

});

router.put("/:id", async (req, res)=>{
  try {
    const findUpdatedPhoto = Photo.findByIdAndUpdate(req.params.id, req.body, {new: true});
    const findFoundUser = User.findOne({"photos._id": req.params.id });
    // run pararrell async taks
    const [updatedPhoto, foundUser ] = await Promise.all([findUpdatedPhoto, findFoundUser])

    if(foundUser._id.toString() != req.body.userId){
          foundUser.photos.id(req.params.id).remove();

          await foundUser.save();
          const newUser = await User.findById(req.body.userId);
          newUser.photos.push(updatedPhoto);

          const savedNewUser = await newUser.save();
          // back to the show page
          res.redirect("/photos/" + req.params.id)

    } else {

          foundUser.photos.id(req.params.id).remove();
          // push new photo
          foundUser.photos.push(updatedPhoto);
          // save the updated User to db
          await foundUser.save()
          res.redirect("/photos/" + req.params.id);
    }

  } catch (err){
    res.send(err);
  }
});

module.exports = router;
