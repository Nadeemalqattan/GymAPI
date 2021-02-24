const express = require("express");
const { Gym } = require("../db/models");
const router = express.Router();
const controllers = require("../controllers/gym");
const upload = require("../middleware/multer");
const passport = require("passport");

router.param("gymId", async (req, res, next, gymId) => {
  const foundGym = await controllers.fetchGym(gymId, next);
  if(foundGym) {
      req.gym = foundGym;
      next();
  }else{
      next({
          status: 404, 
          message: "Gym not found"
      });
  }
});

router.get("/", controllers.gymList);

router.post(
  "/",
  // passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  controllers.gymCreate
);

router.post("/:gymId/classes", upload.single("image"), controllers.classCreate);


module.exports = router;