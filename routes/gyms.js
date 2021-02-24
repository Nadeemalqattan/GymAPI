const express = require("express");
const { Gym } = require("../db/models");
const router = express.Router();
const { gymCreate, fetchGym } = require("../controllers/gym");
const upload = require("../middleware/multer");
const passport = require("passport");

router.get("/", fetchGym);
router.post(
  "/",
  //   passport.authenticate("jwt", { session: false }),
  //   upload.single("image"),
  gymCreate
);

module.exports = router;
