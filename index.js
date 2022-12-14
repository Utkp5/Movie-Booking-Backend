const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const logger = require("morgan");
var cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();



const User = require("./models/user")
const movie = require("./models/movies")

const dbConfig = require("./service/dbConfig");
dbConfig();


app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));




const routes = require("./routes/routes")
const moviesroutes = require("./routes/movieroutes");
const Paymentroutes = require("./routes/Payment");
app.use("/api",routes);
app.use("/api/movies",moviesroutes);
app.use("/api/Payment",Paymentroutes);




app.listen(PORT,function(error) {
    if (error) {
        console.log("Error in starting server");
    }
    console.log(`Server started successfully on PORT : ${PORT}`);
});