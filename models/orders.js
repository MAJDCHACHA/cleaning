// import { DataTypes } from "sequelize";
// export default (sequelize) => {
//   const Orders = sequelize.define('orders', {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     first_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     last_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     E_mail: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     address: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     country: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     phone: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     name_services:{
//         type:DataTypes.STRING,
//         allowNull:false
//     },
//     id_user: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'user', // Table name of the User model
//         key: 'id',
//       },
//     },
//     frequency: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     date: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     available_time: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     state:{
//       type:DataTypes.BOOLEAN,
//       defaultValue:false,
//     }
//   }, {
//     timestamps: false,
//     tableName: "orders",
//   });

//   Orders.associate = (models) => {
//     Orders.belongsTo(models.User, {
//       foreignKey: 'id_user',
//       as: 'user',
//     });

//     Orders.belongsToMany(models.extras, {
//       through: 'order_extra',
//       as: 'extras',
//       foreignKey: 'id_order',
//       otherKey: 'id_extra',
//     });

//     Orders.belongsToMany(models.NeedToBeDone, {
//       through: 'order_need',
//       as: 'needs',
//       foreignKey: 'id_order',
//       otherKey: 'id_need',
//     });
//   };

//   return Orders;
// };
import { DataTypes } from "sequelize";
export default (sequelize) => {
  const Orders = sequelize.define('orders', {
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
    E_mail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name_services: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    frequency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    available_time: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    timestamps: false,
    tableName: "orders",
  });

  Orders.associate = (models) => {
    Orders.belongsTo(models.User, {
      foreignKey: 'id_user',
      as: 'user',
    });

    Orders.belongsToMany(models.Extras, {
      through: 'order_extra',
      as: 'orderExtras',
      foreignKey: 'id_order',
      otherKey: 'id_extra',
    });

    Orders.belongsToMany(models.NeedToBeDone, {
      through: 'order_need',
      as: 'orderNeeds',
      foreignKey: 'id_order',
      otherKey: 'id_need',
    });
  };

  return Orders;
};
