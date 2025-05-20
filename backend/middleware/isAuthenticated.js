const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const isAuthenticated = (req, res, next) => {
    // Fix the typo: "splite" -> "split"
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1]; 

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }
    console.log(token)

    try {
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);

        // Check if the user's role is "student"
        if (decoded.role !== "student") {
            return res.status(403).json({ message: "No authorization" });
        }

        // Attach the decoded user info to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error(error);
    }
};

module.exports = isAuthenticated;
