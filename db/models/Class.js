const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define(
    "Class",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // availableSeats: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      // bookedSeats: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      // price: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      // date: {
      //   type: DataTypes.DATEONLY,
      //   allowNull: false,
      // },
      // time: {
      //   type: DataTypes.TIME,
      //   allowNull: false,
      // },
      // image: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      // },
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    { timestamps: false }
  );
  SequelizeSlugify.slugifyModel(Class, {
    source: ["name"],
  });
  return Class;
};
