// // import mongoose from "mongoose";
// // const UserModel = new mongoose.Schema({
// //   first_name: {
// //     type: String,
// //     required: true,
// //   },
// //   last_name: {
// //     type: String,
// //     required: true,
// //   },
// //   email: {
// //     type: String,
// //     required: true,
// //   },
// //   password: {
// //     type: String,
// //     required: true,
// //   },
// // },{
// //     timestamps:true,
// // });
// // const user = mongoose.model("User",UserModel);
// // export default user;
// // models/User.js
// import { DataTypes } from 'sequelize';

// export default (sequelize) => {
//   const User = sequelize.define('User', {
//     first_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     last_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,  // This might be creating a redundant index
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   }, {
//     timestamps: false,
//     tableName:'user'
//   });
//   User.associate = (models) => {
//     User.hasMany(models.Orders, {
//       foreignKey: 'id_user',
//       as: 'orders',
//     });
//   };
//   return User;
// };
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  // Ensures no duplicate emails
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'user',
  });

  // Define associations
  User.associate = (models) => {
    User.hasMany(models.orders, {
      foreignKey: 'id_user',
      as: 'orders',
    });
  };

  return User;
};
