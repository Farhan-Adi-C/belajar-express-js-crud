const express = require("express");
const app = express();
const conn = require("./config/db");
const port = 5000;
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const flash = require("connect-flash");
const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
  uri:"mongodb+srv://akunnbaru102:LjNZ4B1oOO1jNDyM@farhan.gpt39.mongodb.net/hobby?retryWrites=true&w=majority&appName=farhan",
  collection: "sessions",
});

// middleware
const {verifyToken} = require("./middleware/authMiddleware");

app.use(
  session({
    secret: "12345678",
    resave: false,
    saveUninitialized: false,
    store: store, 
    cookie: { secure: process.env.NODE_ENV === "production" }, 
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// mengirim pesan ketika belum login
app.use(flash());
app.use((req, res, next) => {
  res.locals.message = req.flash("message");
  next();
});


// penanganan request body
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// routes
const web = require("./routes/web-mysql");
app.use("/", web);

const auth = require("./routes/auth");
app.use("/", auth)

const apiMongoDB = require("./routes/api-mongodb");
app.use("/mongodb/api", apiMongoDB);

const webMongoDB = require("./routes/web-mongodb");
app.use("/mongodb/", webMongoDB);

// public
app.use(express.static(path.join(__dirname, "public")));

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// crud logic
app.get("/get-hobby", verifyToken, function (req, res) {
  const queryStr = "SELECT id, hobby FROM hobby WHERE deleted_at IS NULL";
  conn.query(queryStr, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.sqlMessage,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "sukses menampilkan data",
        data: results,
      });
    }
  }); 
});
 
app.post("/post-hobby", verifyToken, function (req, res) {
  const param = req.body;
  const hobby = param.hobby;
  const now = new Date();
  const queryStr = "INSERT INTO hobby (hobby, created_at) VALUES (?, ?)";
  const values = [hobby, now];

  conn.query(queryStr, values, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.sqlMessage,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "berhasil menambah data",
        data: results,
      });
    }
  });
});

app.get("/get-hobby-by-id", verifyToken, function (req, res) {
  const param = req.query;
  const id = param.id;

  const queryStr =
    "SELECT id, hobby FROM hobby where deleted_at IS NULL AND id =?";
  const values = [id];

  conn.query(queryStr, values, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.sqlMessage,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "berhasil menampilkan data",
        data: results,
      });
    }
  });
});

app.put("/update-hobby", verifyToken, function (req, res) {
  const param = req.body;
  const id = param.id;
  const hobby = param.hobby;

  const queryStr =
    "UPDATE hobby SET hobby = ? WHERE id = ? AND deleted_at IS NULL";
  const values = [hobby, id];
  conn.query(queryStr, values, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.sqlMessage,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "berhasil mengupdate data",
        data: results,
      });
    }
  });
});

app.put("/softdelete-hobby", verifyToken, function (req, res) {
  const param = req.query;
  const id = param.id;
  const now = new Date();

  const queryStr =
    "UPDATE hobby set deleted_at = ? WHERE ID = ? AND deleted_at IS NULL";
  const values = [now, id];

  conn.query(queryStr, values, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.sqlMessage,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "berhasil menghapus sementara data",
        data: results,
      });
    }
  });
});

app.delete("/delete-hobby", verifyToken, function (req, res) {
  const param = req.query;
  const id = param.id;
  const queryStr = "DELETE FROM hobby WHERE id = ?";
  const values = [id];
  conn.query(queryStr, values, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.sqlMessage,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "berhasil menghapus data",
        data: results,
      });
    }
  });
});




// menjalankan port

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
