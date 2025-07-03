import { Model, DataTypes } from "sequelize";
import sequelize from '../db/index.js';

const User = sequelize.define('User', {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    // 👇 this ensures an index even if not unique
    index: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    index: true,
  },
  password: DataTypes.STRING,
  phone: DataTypes.STRING,
}, {
  indexes: [
    {
      fields: ['email'],
    },
    {
      fields: ['username'],
    },
  ]
});

export default User;
