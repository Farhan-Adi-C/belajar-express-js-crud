const express = require('express');
const router = express.Router();


//controller hobby untuk web
const { getAllHobbiesForIndex } = require('../controllers/hobbyController');
const { getHobbyById } = require('../controllers/hobbyController');
const { form } = require('../controllers/hobbyController');
const { storeHobby} = require('../controllers/hobbyController');
const { editHobby } = require('../controllers/hobbyController');
const { updateHobby } = require('../controllers/hobbyController');
const { deleteHobby } = require('../controllers/hobbyController');


// router.get('/store', (req, res) => {
//     res.render('layouts', {
//       title: 'Tambah Hobby',
//       body: 'store' 
//     });
//   });





router.get('/index', getAllHobbiesForIndex);
router.get('/show/:id', getHobbyById); 
router.get('/store', (req, res) => {
    res.render('layouts', { title: 'Halaman Store', body: 'store' });
  });
  router.post('/post', storeHobby);
router.get('/edit/:id', editHobby);

router.post('/update', updateHobby);

router.post('/delete', deleteHobby);






module.exports = router;
