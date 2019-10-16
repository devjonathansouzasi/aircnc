require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//auto setting routes by routes/index
require("./app/routes")(app);

app.listen(3200);
