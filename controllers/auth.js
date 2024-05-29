// controllers/auth.js
const jwt = require("jsonwebtoken");
const users = require("../models/user");
const path = require("path");

// controllers/auth.js

// Импорты

// controllers/auth.js
const login = (req, res) => {
  const { email, password } = req.body;

  users
    .findUserByCredentials(email, password)
    .then((user) => {
        const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: 3600
      });
      return { user, token };
    })
    .then(({ user, token }) => {
      res
        .status(200)
        .send({
            _id: user._id, 
            username: user.username, 
            email: user.email, 
            jwt: token });
          })
    .catch(error => {
      res.status(401).send({ message: error.message });
    });
}; 

// Другие функции-контроллеры

const sendDashboard = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin/dashboard.html"));
};
const sendIndex = (req, res) => {
  if (req.cookies.jwt) {
    try {
      jwt.verify(req.cookies.jwt, "some-secret-key");
      return res.redirect("/admin/dashboard");
    } catch (err) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    }
  }
  res.sendFile(path.join(__dirname, "../public/index.html"));
};

const checkAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    req.user = jwt.verify(token, "some-secret-key");
  } catch (err) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }

  next();
};
module.exports = { login, sendIndex , sendDashboard, checkAuth};