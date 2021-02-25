const { User, Class, UserClasses } = require("../db/models");

exports.fetchClass = async (classId, next) => {
  try {
    const foundClass = await Class.findByPk(classId, {
      include: {
        model: User,
        as: "users",
        attributes: ["id"],
        through: {
          attributes: ["userId", "classId"],
        },
      },
    });
    return foundClass;
  } catch(error) {
    next(error);
  }
};

exports.classList = async (req, res, next) => {
    try {
      const classes = await Class.findAll({
        include: {
          model: User,
          as: "users",
          attributes: ["id"],
          through: {
            attributes: ["userId", "classId"],
          },
        },
      });
      res.json(classes);
    } catch (error) {
      next(error);
    }
};

exports.bookClass = async (req, res, next) => {
  // const bookedClasses = await Class.findAll({
  //   include: {
  //     model: User,
  //     as: "users",
  //     attributes: ["id"],
  //     through: {
  //       attributes: ["userId", "classId"],
  //     },
  //   },
  //   where: {
  //     users: 2
  //   },
  // });
  // console.log("User booked", bookedClasses);
  try {
    const foundClass = await Class.findByPk(req.body.id);
    foundClass.addUser(req.body.users);
    res.status(201).json(foundClass);
  } catch (error) {
    next(error);
  }
};

exports.classDetail = async (req, res, next) => {
  res.json(req.class);
};