const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define(
    "Type",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      slug: { type: DataTypes.STRING, unique: true },
    },
    { timestamps: false }
  );
  SequelizeSlugify.slugifyModel(Type, {
    source: ["name"],
  });
  return Type;
};
