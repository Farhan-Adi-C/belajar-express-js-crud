const express = require('express');
const app = express();
const conn = require('./config/db');
const port = 3000

app.use(express.json());

app.get('/get-hobby', function (req, res) {
    const queryStr = "SELECT id, hobby FROM hobby WHERE deleted_at IS NULL";
    conn.query(queryStr, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: err.sqlMessage
            });
        } else {
            res.status(200).json({
                success: true,
                message: "sukses menampilkan data",
                data: results
            });
        }
    });
});

app.post('/post-hobby', function (req, res){
    const param = req.body;
    const hobby = param.hobby;
    const now = new Date();
    const queryStr = "INSERT INTO hobby (hobby, created_at) VALUES (?, ?)";
    const values = [hobby, now];

    conn.query(queryStr, values, (err, results)=> {
        if (err){
            console.log(err);
            res.status(500).json({
                success: false,
                message: err.sqlMessage
            });
        }else{
            res.status(200).json({
                success: true,
                message: "berhasil menambah data",
                data: results
            });
        }
    })
})

app.get('/get-hobby-by-id', function (req, res){
    const param = req.query;
    const id = param.id;

    const queryStr = "SELECT id, hobby FROM hobby where deleted_at IS NULL AND id =?";
    const values = [id];

    conn.query(queryStr, values, (err, results)=> {
        if (err){
            console.log(err);
            res.status(500).json({
                success: false,
                message: err.sqlMessage
            });
        }else{
            res.status(200).json({
                success: true,
                message: "berhasil menampilkan data",
                data: results
            });
        }
    })
})

app.put('/update-hobby', function (req, res){
    const param = req.body;
    const id = param.id;
    const hobby = param.hobby;

    const queryStr = "UPDATE hobby SET hobby = ? WHERE id = ? AND deleted_at IS NULL";
    const values = [hobby, id];
    conn.query(queryStr, values, (err, results)=> {
        if (err){
            console.log(err);
            res.status(500).json({
                success: false,
                message: err.sqlMessage
            });
        }else{
            res.status(200).json({
                success: true,
                message: "berhasil mengupdate data",
                data: results
            });
        }
    })
})

app.put('/softdelete-hobby', function (req, res){
    const param = req.query;
    const id = param.id;
    const now = new Date();

    const queryStr = "UPDATE hobby set deleted_at = ? WHERE ID = ? AND deleted_at IS NULL"
    const values = [now, id];

    conn.query(queryStr, values, (err, results) => {
        if (err){
            console.log(err);
            res.status(500).json({
                success: false,
                message: err.sqlMessage
            });
        }else{
            res.status(200).json({
                success: true,
                message: "berhasil menghapus sementara data",
                data: results
            });
        }
    })
})

app.delete('/delete-hobby', function(req, res){
    const param = req.query;
    const id = param.id;
    const queryStr = "DELETE FROM hobby WHERE id = ?";
    const values = [id];
    conn.query(queryStr, values, (err, results) => {
        if (err){
            console.log(err);
            res.status(500).json({
                success: false,
                message: err.sqlMessage
            });
        }else{
            res.status(200).json({
                success: true,
                message: "berhasil menghapus data",
                data: results
            });
        }
    })

})


app.get('/', (req, res) => {
    const data = "Hello World";

    res.send(data)
    
  })
  

  
app.listen(port, () => {
    console.log(`Server Running on port ${port}`);
});
