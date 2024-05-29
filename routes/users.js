// Создаём роут для запросов пользователей 
const usersRouter = require('express').Router();

// Импортируем вспомогательные функции
const {findAllUsers, createUser, findUserById, updateUser, deleteUser, checkEmptyNameAndEmailAndPassword, hashPassword, checkIsUserExists} = require('../middlewares/users');

const {sendAllUsers, sendUserCreated, sendUserUpdated, sendUserDeleted, sendMe} = require('../controllers/users');
const { sendGameById } = require('../controllers/games');
const { sendCategoryDeleted } = require('../controllers/categories');
const {checkAuth} = require('../middlewares/auth');


// Обрабатываем GET-запрос с роутом '/users'
usersRouter.get('/users', findAllUsers, sendAllUsers);
// routes/users.js
// routes/users.js
usersRouter.get("/users/:id", findUserById, sendGameById);
usersRouter.get("/me", checkAuth, sendMe);
// routes/users.js
usersRouter.post(
  "/users",
  findAllUsers,
  checkAuth,
  hashPassword,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  createUser,
  sendUserCreated
);
usersRouter.put(
  "/users/:id",
  checkAuth,
  updateUser,
  sendUserUpdated,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword
);
usersRouter.delete(
    "/users/:id",
    checkAuth,
    deleteUser,
    sendUserDeleted
);
// Экспортируем роут для использования в приложении — app.js
module.exports = usersRouter;