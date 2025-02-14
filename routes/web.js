const express = require('express');
const router = express.Router();
const { getAllHobbiesForIndex } = require('../controllers/hobbyController');


router.get('/coba', (req, res) => {
    res.render('layouts', {
        title: 'Tentang Kami',
        body: 'create',
        content: '<h2>Selamat datang di halaman utama!</h2>'
    });
});

router.get('/index', getAllHobbiesForIndex);


module.exports = router;
