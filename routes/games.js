  // Создаём роут для запросов категорий 
  const gamesRouter = require('express').Router();
  
  // Импортируем вспомогательные функции
  const {findAllGames, createGame, findGameById, updateGame, deleteGame, checkEmptyFields, checkIfUsersAreSafe, checkIfCategoriesAvaliable, checkIsGameExists, checkEmptyName, checkIsVoteRequest} = require('../middlewares/games');
  
  
  const {sendAllGames  , sendGameCreated, sendGameById, sendGameUpdated, sendGameDeleted} = require('../controllers/games');
const {checkAuth} = require('../middlewares/auth');
  
  
  // Обрабатываем GET-запрос с роутом '/categories'
  gamesRouter.get('/games', findAllGames, sendAllGames);
  gamesRouter.post(
    "/games",
    findAllGames,
    checkIsGameExists,
    checkIfCategoriesAvaliable,
    checkEmptyFields,
    createGame,
    sendGameCreated,
    checkAuth
  );
  gamesRouter.get("/games/:id", findGameById, sendGameById);
  // Файл routes/games.js

gamesRouter.put(
  "/games/:id", // Слушаем запросы по эндпоинту
  // Шаг 1. Находим игру по id из запроса
    findGameById,
    checkIsVoteRequest,
    // Шаг 2. Выполняем проверки для корректного обновления
    // Шаг 3. Обновляем запись с игрой
    updateGame,
    checkIfUsersAreSafe,
    checkIfCategoriesAvaliable,
    checkEmptyFields,
    // Шаг 4. Возвращаем на клиент ответ с результатом обновления
    sendGameUpdated,
    checkAuth
);
  // Файл routes/games.js

// Файл routes/games.js

gamesRouter.delete(
  "/games/:id", // Слушаем запросы по эндпоинту
  deleteGame,
  sendGameDeleted,
  checkAuth // Тут будут функция удаления элементов из MongoDB и ответ клиенту
);
  // Экспортируем роут для использования в приложении — app.js
  module.exports = gamesRouter
  