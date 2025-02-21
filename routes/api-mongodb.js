  const express = require('express');
  const router = express.Router();

  //mongodb hobby
  const hobbyController2 = require('../controllers/HobbyController-mongodb-api');

  router.get('/index-mongodb', hobbyController2.allHobby);
  router.post('/create-mongodb', hobbyController2.addHobby);
  router.get('/show-mongodb/:id', hobbyController2.showHobbyById);
  router.put('/update-mongodb', hobbyController2.updateHobby);
  router.delete('/delete-mongodb/:id', hobbyController2.deleteHobby)
  
  module.exports = router;
