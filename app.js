const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const connectToDatabase = require('./database/connect');
const apiRouter = require('./routes/apiRouter');
const usersRouter = require('./routes/users');
const  gamesRouter  = require('./routes/games');
const categoriesRouter = require('./routes/categories');
const authRouter = require('./routes/auth');
const cookieParser = require('cookie-parser');
const pagesRouter = require('./routes/pages');
const cors = require('./middlewares/cors');



const app = express();
const PORT = 3001;

connectToDatabase();

app.use(
  cors,
  cookieParser(),
  bodyParser.json(),
  apiRouter,
  pagesRouter,
  express.static(path.join(__dirname, "public")),
  
  
);
app.listen(PORT);