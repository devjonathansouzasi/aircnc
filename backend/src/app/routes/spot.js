const express = require("express");

const multer = require("multer");

const uploadConfig = require("../config/upload");

const uploader = multer(uploadConfig);

const SpotController = require("../controllers/SpotController");

const router = express.Router();

router.get("/", SpotController.index);
router.post("/", uploader.single("thumbnail"), SpotController.store);
router.delete("/:spot_id", SpotController.delete);

module.exports = app => app.use("/spots", router);
