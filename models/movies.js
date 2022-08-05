const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        movielbImg : {
            type : String,
            require : true,
        },
        movieName : {
            type : String,
            require : true,
        },
        theatre : {
            type : String,
            require : true,
        },
        language : {
            type : String,
            require : true,
        },
        genres : {
            type : String,
            require : true,
        },
        year : {
            type : Number,
            require : true,
        },
        time : {
            type : String,
            require : true,
        },
        description : {
            type : String,
            require : true,
        },
    },
    {
        timestamps : true,
    }
);

const Movies = mongoose.model("Movies",movieSchema);
module.exports = Movies;