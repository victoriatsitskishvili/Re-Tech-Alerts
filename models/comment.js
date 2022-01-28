const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    // create fields/columns for comment model//
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize
  }
);

module.exports = Comment;