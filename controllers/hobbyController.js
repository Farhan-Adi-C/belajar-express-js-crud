const db = require('../config/db'); // Panggil konfigurasi database

const getAllHobbiesForIndex = (req, res) => {
  db.query('SELECT * FROM hobby', (error, results) => { 
    if (error) {
      res.status(500).send('Error fetching hobbies');
    } else {
        console.log(results)
      res.render('layouts', {
        title: 'Hobby',
        body: 'index',
        hobbies: results 
      });
    }
  });
};


module.exports = { getAllHobbiesForIndex };
