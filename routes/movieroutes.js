const express = require("express");
const router = express.Router();
const movie = require("../models/movies");
const authFile = require("../service/authentication");



router.get("/", function(req,res) {
    try {
        return res.send("movies router all ok");
        
    } catch (error) {
        console.log(error);
    }
})



//Add movies
router.post("/addmovies", authFile.authenticationChecker ,async(req,res) => {

    try {
        const {movieName,theatre,language,genres,time,movielbImg} = req.body;  //rather than writing individualy we have writen in single line.
    
        if (!(movieName && theatre && language && genres && time && movielbImg)){
    
            return res.status(400).send("You are missing something");
        }
        else {
            await movie.create({
                movielbImg  : req.body.movielbImg,
                movieName   : req.body.movieName,
                theatre     : req.body.theatre,
                language    : req.body.language,
                genres      : req.body.genres,
                year      : req.body.year,
                time        : req.body.time,
            });
        }
    
        return res.send("Movie Added Successfully");
        
    } catch (error) {
        console.log(error);
    }
});



//Delete Movie
router.delete("/deletemovies/:id", authFile.authenticationChecker ,async(req,res) => {

    try {
        const id = req.params.id;
        await movie.findByIdAndDelete(id);
    
        return res.send("Movie Deleted Successfully");
        
    } catch (error) {
        console.log(error);
    }
});



// Find Movies
router.get("/findmovies/:movieid", authFile.authenticationChecker ,async(req,res) => {
    
    try {
        if(!movie)
        {
    
            return res.status(500).send("Movie not found");
        }
        else
        {
            const movieid = req.params.movieid;
        
            const Movie = await movie.findById(movieid);
        
            return res.send(Movie);
        }
        
    } catch (error) {
        console.log(error);
    }
    

});



//Update movies schema
router.post("/updatemovies", authFile.authenticationChecker ,async(req,res) => {

    try {
        const movieid =  req.body.movieid;
        description = req.body.description;

        const updatedUser = await movie.findByIdAndUpdate(movieid, {
            description : description,
        },
        {
            new : true,
            runValidators : true,
        });
        
    } catch (error) {
        return res.status(400).send("Not updated");
    }
});

//Show Movie
router.get("/getallmovies", authFile.authenticationChecker ,async(req,res) => {
    try {
        const moviee = await movie.find({});
        return res.send(moviee);
        
    } catch (error) {
        console.log(error);
     return res.send(error);
    }
    
})


module.exports = router;