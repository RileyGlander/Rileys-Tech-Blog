const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
        {
          id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            },
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [8],
            },
          },
        },
        {
          hooks: {
            beforeCreate: async (newUserData) => {
              newUserData.password = await bcrypt.hash(newUserData.password, 10);
              return newUserData;
            },
          },
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: 'user',
        }
      );

module.exports = Comment