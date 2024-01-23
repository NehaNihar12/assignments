const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');


// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];

    // It saves you 1 DB call. You can authenticate the user on server itself using secret amd token
    const decoded = jwt.verify(jwtToken,JWT_SECRET);
    if(decoded.username){
        // for authorisation, check && decoded.type === "admin"
        next();
    }else{
        res.status(403).json({message: "You are not authenticated!"});
    }

}

module.exports = adminMiddleware;