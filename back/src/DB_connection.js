require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const FavoriteModel = require('./models/Favorite')
const UserModel = require('./models/User')

const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/rickandmorty`,
   { logging: false, native: false }
);

FavoriteModel(sequelize);
//
UserModel(sequelize);

const { User, Favorite } = sequelize.models;
User.belongsToMany(Favorite, {through: 'user_favorite'});
Favorite.belongsToMany(User, {through: 'user_favorite'});

module.exports = {
   User,
   Favorite,
   conn: sequelize,
};
