const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY

const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];  // Corrected spelling

  if (!token) {
    return res.status(403).json({ message: "no token provided" })
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "no authorization" })
    }

    req.user = decoded;
    next()

  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error);
  }

}

module.exports = isAdmin;