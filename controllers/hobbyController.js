const db = require('../config/db'); // Panggil konfigurasi database

const getAllHobbiesForIndex = (req, res) => {
  db.query('SELECT * FROM hobby', (error, results) => { 
    if (error) {
      res.status(500).send('Error fetching hobbies');
    } else {
      res.render('layouts', {
        title: 'Hobby',
        body: 'index',
        hobbies: results 
      });
    }
  });
};

const getHobbyById = (req, res) => {
    const hobbyId = req.params.id; 
  
    db.query('SELECT * FROM hobby WHERE id = ?', [hobbyId], (error, results) => {
      if (error) {
        res.status(500).send('Error fetching hobby by ID');
      } else if (results.length === 0) {
        res.status(404).send('Hobby not found');
      } else {
        res.render('layouts', {
          title: 'Hobby Detail',
          body: 'show', 
          hobbies: results[0],
        });
      }
    });
  };


  const storeHobby = (req, res) => {
    const {hobby} = req.body;
    const now = new Date();

    db.query('INSERT INTO hobby (hobby, created_at) VALUES (?, ?)', [hobby, now], (error, results) => {
        if (error){
            res.status(500).send('Failed to store hobby');
        }else{
            res.redirect('/index'); 
        }
    })
  }

  const editHobby = (req, res) => {
    const param = req.query;
    const id = req.params.id; 
    // console.log(id)

    db.query('SELECT id, hobby FROM hobby where id = ? ', [id], (error, results) => {
        if (error){
            res.status(500).send('Failed to Edit hobby');
        }else{
            res.render('layouts', {
                title: 'Edit Hobby',
                body: 'update', 
                hobby: results[0],
              });
        }
    })
  }

const updateHobby = (req, res) => {
    const {hobby}= req.body;
    const {id}= req.body;

    db.query('UPDATE hobby SET hobby = ? WHERE id = ?', [hobby, id], (err, results) => {
        if (err){
            console.log(err)
            res.status(500).send('Failed to Update hobby');
        }else{
            // console.log(results)
            console.log(req.body);

            res.redirect('/index');
        }
    })

}

const deleteHobby = (req, res) => {
    const {id} = req.body;

    db.query("DELETE FROM hobby WHERE id = ?", [id], (err, results) => {
        if (err){
            res.status(500).send('Failed to Delete hobby');
        }else{
            console.log(id)

            res.redirect('/index');
        }
    })
}

module.exports = { 
    getAllHobbiesForIndex,
    getHobbyById , 
    storeHobby,
    editHobby,
    updateHobby,
    deleteHobby
};
