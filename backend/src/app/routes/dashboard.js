const express = require("express");

const router = express.Router();

const DashboardController = require("../controllers/DashboardController");

router.get("/", DashboardController.show);

module.exports = app => app.use("/dashboard", router);
