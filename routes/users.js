const express = require("express");
const router = express.Router();
const passport = require("passport");
const controllers = require("../controllers/user");

router.post("/signup", controllers.signup);
router.post("/signin", passport.authenticate("local", { session: false }), controllers.signin);

module.exports = router;