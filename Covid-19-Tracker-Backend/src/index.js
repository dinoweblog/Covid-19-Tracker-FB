const express = require("express");
const cors = require("cors");
const { register, login } = require("./controllers/auth.controller");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static("public"));

app.post("/register", register);
app.post("/login", login);



module.exports = app;
