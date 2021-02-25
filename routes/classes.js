const express = require("express");
const router = express.Router();
const controllers = require("../controllers/class");

router.param("classId", async (req, res, next, classId) => {
    const foundClass = await controllers.fetchClass(classId, next);
    if (foundClass) {
      req.class = foundClass;
      next();
    } else next({ status: 404, message: "Class Not Found." });
});

router.get("/:classId", controllers.classDetail);

router.get("/", controllers.classList);

router.post("/bookclass", controllers.bookClass);


module.exports = router;