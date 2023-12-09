require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY, DB_PORT, DB_NAME, DB_DIALECT } = process.env;
const FavoriteModel = require("./models/Favorite.js");
const UserModel = require("./models/User.js");

const sequelize = new Sequelize(
  `${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { logging: false },
  {
    dialectOptions: {
      ssl: {
        require: true
      }
    }
  }
);

FavoriteModel(sequelize);
UserModel(sequelize);

const { User, Favorite } = sequelize.models;

// Ejercicio 06
// ¡Relaciona tus modelos aquí abajo!
User.belongsToMany(Favorite, { through: "user_favorite" });
Favorite.belongsToMany(User, { through: "user_favorite" });

module.exports = {
  User,
  Favorite,
  conn: sequelize,
};

