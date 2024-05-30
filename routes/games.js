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
    checkAuth,
    checkIsGameExists,
    checkIfCategoriesAvaliable,
    checkEmptyFields,
    createGame,
    sendGameCreated
    
  );
  gamesRouter.get("/games/:id", findGameById, sendGameById);
  // Файл routes/games.js

gamesRouter.put(
  "/games/:id", // Слушаем запросы по эндпоинту
  // Шаг 1. Находим игру по id из запроса
    findGameById,
    checkIsVoteRequest,
    checkAuth,
    // Шаг 2. Выполняем проверки для корректного обновления
    // Шаг 3. Обновляем запись с игрой
    checkIfUsersAreSafe,
    checkIfCategoriesAvaliable,
    checkEmptyFields,
  updateGame,
    // Шаг 4. Возвращаем на клиент ответ с результатом обновления
    sendGameUpdated,
    
);
  // Файл routes/games.js

// Файл routes/games.js

gamesRouter.delete(
  "/games/:id", // Слушаем запросы по эндпоинту
  checkAuth 
  deleteGame,
  sendGameDeleted,
  // Тут будут функция удаления элементов из MongoDB и ответ клиенту
);
  // Экспортируем роут для использования в приложении — app.js
  module.exports = gamesRouter
  
