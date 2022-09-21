const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const Razorpay = require('razorpay');
const authFile = require("../service/authentication");



// router.get("/msg",function(req,res) {
//     return res.send("hey I'm utkarsh");
// });

router.get("/",function(req,res) {

    try {
        return res.send("user router all ok");
        
    } catch (error) {
        console.log(error);
    }
});







var salt =  bcrypt.genSaltSync(10);

//User registration process
router.post("/Register", async (req,res) => {

    try {
        
        var hash = bcrypt.hashSync(req.body.password)
        const firstName  = req.body.firstName;
        const lastName  = req.body.lastName;
        const userEmail  = req.body.userEmail;
        const Password  = req.body.password;
        const oldUser = await User.findOne({ userEmail });
        const letters = /^[a-zA-Z]*$/;


    if ( !(firstName.match(letters)) || !(lastName.match(letters))) {
        return res.status(400).send("Name Does not contain Special Character")
    }
    else if(!(firstName && lastName && userEmail && Password)){
        return res.status(400).send("You are missing something");
    }
    else if (firstName === lastName) {
        return res.status(400).send("FirstName and LastName should not be same");
    }
    else if (Password.length < 8) {
      return res.status(400).send( "Your Password must be atleast 8 characters" );
    }
    else if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
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
    
    } catch (error) {
        console.log(error);
    }
    
});


// Signin/Login
router.post("/Login", async(req,res) => {

    try {
        const user = await User.findOne({userEmail : req.body.userEmail});
        const check = bcrypt.compareSync(req.body.password, user.password);
    
        if(!(user && check)){
            return res.status(401).send("Invalid Credentials");
        }
        
        const token = authFile.getToken(user._id);
        return res.send({token : token,userid : user._id});

    } catch (error) {
        console.log(error);
    }

})


// Update User password
router.post("/update", authFile.authenticationChecker ,async(req,res) => {
    try {
        
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

    } catch (error) {
        console.log(error);
    }

});


// Delete User
router.delete("/delete", async(req,res) => {
    try {
        
        const id = req.body.id;
        await User.findByIdAndDelete(id);
        return res.send("Deleted Successfully");

    } catch (error) {
        console.log(error);
    }
})


//fetch all user
router.get("/getalluser", async (req,res) => {
    try {
        
        const users = await User.find({});
        return res.send(users);

    } catch (error) {
        console.log(error);
    }
})



//How many movies booked by user  
router.post("/Moviebook/:movieid", authFile.authenticationChecker, async(req,res) => {

    try {
        const userid = req.body.id;
        const movieid = req.params.movieid;
        console.log(userid,movieid);
        const updatedUser = await User.findByIdAndUpdate(userid,{
    
            $push : {moviebooked : movieid}
        },
        {
            new : true,
            runValidators : true,
        });
        return res.send(updatedUser);        
    } catch (error) {
        console.log(error);
    }
});





 

module.exports = router;