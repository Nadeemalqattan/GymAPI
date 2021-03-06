"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Gym.hasMany(db.Class, { foreignKey: "gymId", as: "classes" });
db.Class.belongsTo(db.Gym, { foreignKey: "gymId", as: "gym" });

db.User.hasMany(db.Gym, { foreignKey: "userId", as: "gym" });
db.Gym.belongsTo(db.User, { as: "user" }); //admin

db.User.belongsToMany(db.Class, { through: "UserClasses", foreignKey: "userId", as: "classes" });
db.Class.belongsToMany(db.User, { through: "UserClasses", foreignKey: "classId", as: "users" });

// db.Type.hasMany(db.Class, { foreignKey: "type", as: "classes" });
// db.Class.belongsTo(db.Type, { foreignKey: "type", as: "type" });

// db.User.hasMany(db.Class, {foreignKey: "class", as: "class"});
// db.Class.belongsTo(db.User, {as: "user"}); //user

module.exports = db;
