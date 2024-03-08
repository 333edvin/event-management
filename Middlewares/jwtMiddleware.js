const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    console.log("jwtmiddlewareee");

    // Check if the authorization header is present
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json("Authorization header missing");
    }

    try {
        // Verify the token
        const tokenVerification = jwt.verify(token.slice(7), "superkey2024");
        
        // Set the userId in the request object
        req.payload = tokenVerification.userId;
        
        next();
    } catch (error) {
        // If token verification fails it send an authorization failure response
        console.error("Token verification failed:", error);
        return res.status(401).json("Authorization failed..please login again.");
    }
};



module.exports = jwtMiddleware;
