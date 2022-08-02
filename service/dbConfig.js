const mongoose = require("mongoose");

const dbconnect = async () => {
    try {
        await mongoose.connect("mongodb+srv://Utkarsh5:otY4vHq90FWqrXSv@cluster0.allij.mongodb.net/moviebooking?retryWrites=true&w=majority", {
            useUnifiedTopology : true,
            useNewUrlParser : true,
        });

        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log(`Error in Connecting to mongoDB ${error}`);
    }
};


module.exports = dbconnect;