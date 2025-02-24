const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const { authMiddleware } = require("../middleware/authMiddleware");


router.get("/", AuthController.registerApi); 
router.get("/login", AuthController.toLogin);
router.post("/form-login", AuthController.loginWeb);

// web auth

router.get("/register", AuthController.toRegister);
router.post("/register", AuthController.registerWeb);
router.get("/logout", AuthController.logoutWeb);
router.get("/logout-api", AuthController.logoutApi);




module.exports = router;