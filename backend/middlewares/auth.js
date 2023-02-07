const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async(req, res, next)=>{

    const {token} = req.cookies;
    if(!token) {
        return res.status(401).json({
            message: "Please login first"
        });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);

    next();
};