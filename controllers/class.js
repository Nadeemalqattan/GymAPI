const { Class } = require("../db/models");


exports.classList = async (req, res, next) => {
    try {
      const classes = await Class.findAll({
        include: {
          model: User,
          as: "users",
          attributes: ["id"],
        },
      });
      res.json(classes);
    } catch (error) {
      next(error);
    }
  };