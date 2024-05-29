  // Создаём роут для запросов категорий 
  const categoriesRouter = require('express').Router();
  
  // Импортируем вспомогательные функции
  const {findAllCategories, createCategory, findCategoryById, updateCategory, deleteCategory, checkIsCategoryExists} = require('../middlewares/categories');

  const {sendAllCategories, sendCategoryCreated, sendCategoryById, sendCategoryUpdated, sendCategoryDeleted} = require('../controllers/categories');
const { checkEmptyName } = require('../middlewares/games');
const {checkAuth} = require('../middlewares/auth');


  
  // Обрабатываем GET-запрос с роутом '/categories'
  categoriesRouter.get('/categories', findAllCategories, sendAllCategories);
  // routes/categories.js
// routes/categories.js
categoriesRouter.post(
  "/categories",
  findAllCategories,
  checkAuth,
  checkIsCategoryExists,
  checkEmptyName,
  createCategory,
  sendCategoryCreated
);
categoriesRouter.put(
  "/categories/:id",
  checkAuth,
  updateCategory,
  checkEmptyName,
  sendCategoryUpdated
);
categoriesRouter.delete(
  "/categories/:id",
  checkAuth,
  deleteCategory,
  sendCategoryDeleted
);
  // Экспортируем роут для использования в приложении — app.js
  module.exports = categoriesRouter;
   