const express = require("express");
const router = express.Router();
const controllers = require("../controllers/class");

router.get("/", controllers.classList);

module.exports = router;