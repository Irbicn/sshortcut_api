const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const access = require("./API/access");
const register = require("./API/register");
const url_crear = require("./API/url_crear");
const url_read = require("./API/url_read");
const url_delete = require("./API/url_delete");
const url_update = require("./API/url_update");
const errorMw = require("./middlewares/error.mw");
const securityMw = require("./middlewares/security.mw");
const DBConnMw = require("./middlewares/DBConn.mw");
const verify = require("./API/verify");
const url_short = require("./API/url_short");

require("dotenv").config();
const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.APPURL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "content-type, HEY, ELTOKEN",
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(errorMw);
app.use(securityMw);
app.use(DBConnMw);
app.use(express.json());

const port = process.env.PORT || 5500;

app.get("/");
app.post("/acount/register", register);
app.post("/acount/access", access);
app.get("/acount/verify", verify);
app.put("/url/create", url_crear);
app.get("/url/read", url_read);
app.post("/url/update", url_update);
app.delete("/url/delete", url_delete);
app.get("/url/get/:short", url_short);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
