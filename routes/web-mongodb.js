const express = require("express");
const router = express.Router();

//mongodb hobby
const hobbyController2 = require("../controllers/HobbyController-mongodb-web");
const { authMiddleware } = require('../middleware/authMiddleware');

router.get("/index", authMiddleware,hobbyController2.allHobby);
router.post("/create",authMiddleware, hobbyController2.addHobby);
router.get("/show/:id", authMiddleware,hobbyController2.showHobbyById);
router.get("/edit/:id", authMiddleware,hobbyController2.editHobby);
router.post("/update", authMiddleware,hobbyController2.updateHobby);
router.post("/delete", authMiddleware,hobbyController2.deleteHobby);

router.get("/store", (req, res) => {
  res.render("layouts", { title: "Halaman Store", body: "store-mongodb" });
});
// router.get('/edit/:id', (req, res) => {
//     res.render('layouts', { title: 'Halaman Edit', body: 'update-mongodb' });
//   });

module.exports = router;
