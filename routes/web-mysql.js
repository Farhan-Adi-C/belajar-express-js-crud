const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET || "12345678";
const { authMiddleware } = require("../middleware/authMiddleware");

//controller hobby untuk web
const { getAllHobbiesForIndex } = require("../controllers/hobbyController");
const { getHobbyById } = require("../controllers/hobbyController");
const { form } = require("../controllers/hobbyController");
const { storeHobby } = require("../controllers/hobbyController");
const { editHobby } = require("../controllers/hobbyController");
const { updateHobby } = require("../controllers/hobbyController");
const { deleteHobby } = require("../controllers/hobbyController");

router.get("/index", authMiddleware, getAllHobbiesForIndex);
router.get("/show/:id", authMiddleware, getHobbyById);
router.get("/store", authMiddleware, (req, res) => {
  res.render("layouts", { title: "Halaman Store", body: "store" });
});
router.post("/post", authMiddleware, storeHobby);
router.get("/edit/:id", authMiddleware, editHobby);

router.post("/update", authMiddleware, updateHobby);

router.post("/delete", authMiddleware, deleteHobby);

module.exports = router;
