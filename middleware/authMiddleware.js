const SECRET_KEY = process.env.JWT_SECRET || "12345678";
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log("Session Data:", req.session);

  if (!req.session.user) {
    return res.status(401).json({ error: "Access denied, session not found" });
  }

  // Jika session valid, tambahkan user ke request
  req.user = req.session.user;
  console.log("Verified User:", req.user);
  
  next();
};


function authMiddleware(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    req.flash("message", "Anda belum login, silakan login terlebih dahulu!");
    res.redirect("/login");
  }
}




module.exports = { verifyToken,  authMiddleware };
