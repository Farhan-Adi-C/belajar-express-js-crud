const express = require('express');
const router = express.Router();

//mongodb hobby
const hobbyController2 = require('../controllers/HobbyController-mongodb-web');

router.get('/index', hobbyController2.allHobby);
router.post('/create', hobbyController2.addHobby);
router.get('/show/:id', hobbyController2.showHobbyById);
router.get('/edit/:id', hobbyController2.editHobby);
router.post('/update', hobbyController2.updateHobby);
router.post('/delete', hobbyController2.deleteHobby)

router.get('/store', (req, res) => {
    res.render('layouts', { title: 'Halaman Store', body: 'store-mongodb' });
  });
// router.get('/edit/:id', (req, res) => {
//     res.render('layouts', { title: 'Halaman Edit', body: 'update-mongodb' });
//   });
module.exports = router;