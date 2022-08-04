const jwt = require("jsonwebtoken");

const getToken = (id) => {
    return jwt.sign(
        {
            id : id,
        },
        "secret",
        {
            expiresIn : "10d"
        }
    );
};

const authenticationChecker = (req,res,next) => {
    if(req.headers.auth) {

        try {

            const token = req.headers.auth;
            var decoded = jwt.verify(token,"secret")
            next();

        } 
        catch (error) {
            return res.send("Invalid Credentials")
        }
    }
    else
    {
        return res.status(500).send("No headers Detected");
    }
};

module.exports = {getToken,authenticationChecker};