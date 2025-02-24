const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");


const toRegister = async (req, res) => {
  res.render("register");
};

const toLogin = async (req, res) => {
  res.render("login");
};

// auth api

const registerApi = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ error: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      }, 
    });

    req.session.user = { id: user.id, email: user.email, name: user.name };

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginApi = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Invalid password" });

    req.session.user = { id: user.id, email: user.email, name: user.name }; // Simpan user data

    res.json({
      status: true,
      message: "Login successful",
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// auth web

const registerWeb = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser){
      req.flash("message", "Email Sudah terdaftar")
      return res.redirect("/register");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { 
        email,
        name,
        password: hashedPassword,
      },
    });

    req.session.user = { id: user.id, email: user.email, name: user.name };

    res
      .redirect("/index")
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginWeb = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      req.flash("message", "Email tidak ditemukan")
      return res.redirect("/login")
    };

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      {
         req.flash("message", "Password Salah")
         return res.redirect("/login")
      };

    req.session.user = { id: user.id, email: user.email, name: user.name };

    res
    .redirect("/index")
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logoutWeb = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error saat logout:", err);
      return res.status(500).json({ error: "Logout failed" });
    }
    res.redirect("/login");
  });
};
const logoutApi = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error saat logout:", err);
      return res.status(500).json({ error: "Logout failed" });
    }
    res.status(200).json({
      status: true,
      message: "logout successfully"
    });
  });
};



module.exports = {
  toRegister,
  toLogin,
  registerApi,
  loginApi,
  registerWeb,
  loginWeb,
  logoutWeb,
  logoutApi
};
