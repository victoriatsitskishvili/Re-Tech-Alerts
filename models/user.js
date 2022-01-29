const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// To create a User//
class User extends Model {

  // To check the password per each user // 
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(

    // create fields/columns for User model//
    //ID, Username, Password//
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6]
      }
    }
  },
  {
    hooks: {
      // Set up beforeCreate lifecycle "hook" functionality - The beforeCreate hook runs whenever a component is initialized//
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },

      // Set up beforeUpdate lifecycle "hook" functionality -The beforeUpdate hook runs after data changes on your component, right before the DOM is patched and re-rendered//
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize,
    modelName: 'User',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  }
);

module.exports = User;