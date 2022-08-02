const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
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
        format : {
            type : String,
            require : true,
        },
        time : {
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