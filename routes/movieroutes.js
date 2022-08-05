const express = require("express");
const router = express.Router();
const movie = require("../models/movies");
const authFile = require("../service/authentication");



router.get("/", function(req,res) {
    return res.send("movies router all ok");
})



//Add movies
router.post("/addmovies", async(req,res) => {
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
});



//Delete Movie
router.delete("/deletemovies/:id", async(req,res) => {

    const id = req.params.id;
    await movie.findByIdAndDelete(id);

    return res.send("Movie Deleted Successfully");
});



// Find Movies
router.get("/findmovies/:movieid", async(req,res) => {
    
    
    
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

});






//Show Movie
router.get("/getallmovies",authFile.authenticationChecker,async(req,res) => {
    try {
        const moviee = await movie.find({});
        return res.send(moviee);
    } catch (error) {
        console.log(error);
     return res.send(error);
    }
    
})


module.exports = router;