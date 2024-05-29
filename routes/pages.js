// routes/pages.js
const { sendIndex, sendDashboard } = require("../controllers/auth.js");
const { checkCookiesJWT} = require("../middlewares/auth.js");
const pagesRouter = require("express").Router();
pagesRouter.get("/", sendIndex); 
pagesRouter.get("/admin/**", checkCookiesJWT, sendDashboard); 
module.exports = pagesRouter