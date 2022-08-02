const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const authFile = require("../service/authentication");



// router.get("/msg",function(req,res) {
//     return res.send("hey I'm utkarsh");
// });

router.get("/",function(req,res) {
    return res.send("user router all ok");
});





var salt =  bcrypt.genSaltSync(10);

//User registration process
router.post("/register", async (req,res) => {
    var hash = await bcrypt.hashSync(req.body.password)
    const firstName  = req.body.firstName;
    const lastName  = req.body.lastName;
    const userEmail  = req.body.userEmail;
    const Password  = req.body.password;


    if(!(firstName && lastName && userEmail && Password)){
        return res.status(400).send("You are missing something");
    }
    else if (firstName === lastName) {
        return res.status(400).send("FirstName and LastName should not be same");
    }
    else if (Password.length < 8) {
      return res.status(400).send( "Your Password must be atleast 8 characters" );
    }
        else{
            await User.create({
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                userEmail : req.body.userEmail,
                password : hash,
            });
        }
   
    return res.send("User Registered Successfully");
});


// Signin/Login
router.post("/signin", async(req,res) => {
    const userEmail = await User.findOne({userEmail : req.body.userEmail});
    const check = bcrypt.compareSync(req.body.password, User.password);

    if(!(userEmail && check)){
        return res.status(401).send("Invalid Credentials");
    }
    

    const token = authFile.getToken(User._id);
    return res.send(token);

})


// Update User
router.post("/update", async(req,res) => {
    const id = req.body.id;
    var hash = bcrypt.hashSync(req.body.password,salt);
    const Password = req.body.password;

    if (Password.length < 8) {
        return res.status(400).send( "New Password must Contain 8 characters" );
      }
      else{
          const updatedUser = await User.findByIdAndUpdate(id, {
              password : hash,
          },
          {
              new : true,
              runValidators : true
          });
          return res.send(updatedUser);
      }

});


// Delete User
router.delete("/delete", async(req,res) => {
    const id = req.body.id;
    await User.findByIdAndDelete(id);
    return res.send("Deleted Successfully");
})


//fetch all user
router.get("/getalluser", async (req,res) => {
    const users = await User.find({});
    return res.send(users);
})


module.exports = router;