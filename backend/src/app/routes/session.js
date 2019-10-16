const express = require("express");

const router = express.Router();

const SessionController = require("../controllers/SessionController");

router.get("/", SessionController.index);
router.post("/", SessionController.store);
router.delete("/:id", SessionController.delete);

module.exports = app => app.use("/sessions", router);
