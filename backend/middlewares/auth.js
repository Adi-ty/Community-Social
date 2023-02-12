const User = require("../models/User");
const jwt = require("jsonwebtoken");
// middleware to give access to specific routes to authorized user only
exports.isAuthenticated = async(req, res, next)=>{

    try{//checking token in cookies
        const {token} = req.cookies;
        if(!token) { // if token not found 
            return res.status(401).json({
                message: "Please login first"
            });
        }
        // decoded token 
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        // finding user using decoded token 
        req.user = await User.findById(decoded._id);

        next();
    } catch(error) {
        res.status(500).json({
            message: error.message,
        });
    }

};