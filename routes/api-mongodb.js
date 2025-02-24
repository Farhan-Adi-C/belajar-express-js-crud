const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middleware/authMiddleware");

//mongodb hobby
const hobbyController2 = require("../controllers/HobbyController-mongodb-api");

// router.get("/index-mongodb", verifyToken, hobbyController2.allHobby);
// router.post("/create-mongodb",  verifyToken, hobbyController2.addHobby);
// router.get("/show-mongodb/:id",   verifyToken,hobbyController2.showHobbyById);
// router.put("/update-mongodb",   verifyToken,hobbyController2.updateHobby);
// router.delete("/delete-mongodb/:id",   verifyToken,hobbyController2.deleteHobby);

router.get("/index-mongodb", hobbyController2.allHobby);
router.post("/create-mongodb", hobbyController2.addHobby);
router.get("/show-mongodb/:id", hobbyController2.showHobbyById);
router.put("/update-mongodb", hobbyController2.updateHobby);
router.delete("/delete-mongodb/:id", hobbyController2.deleteHobby);

const AuthController = require("../controllers/AuthController");
// auth API
router.post("/post-register", AuthController.registerApi);
router.post("/post-login", AuthController.loginApi);

// auth Web
router.get("/", AuthController.toRegister);

module.exports = router;
