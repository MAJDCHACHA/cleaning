
// import { DataTypes } from "sequelize";
// export default (sequelize) => {
//   const services = sequelize.define("services", {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     isDeleted:{
//       type:DataTypes.BOOLEAN,
//       defaultValue:false,
//     }
//   }, {
//     timestamps: false,
//     tableName: "services",
//   });

//   // Define many-to-many associations
//   services.associate = (models) => {
//     services.belongsToMany(models.extras, {
//       through: 'services_extra',
//       as: 'extras',
//       foreignKey: 'id_services',
//       otherKey: 'id_extras',
//     });

//     services.belongsToMany(models.NeedToBeDone, {
//       through: 'services_need',
//       as: 'needToBeDone',
//       foreignKey: 'id_services',
//       otherKey: 'id_need',
//     });
//   };
//   return services;
// };

import { DataTypes } from "sequelize";
export default (sequelize) => {
  const Services = sequelize.define("services", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    timestamps: false,
    tableName: "services",
  });

  // Define associations
  Services.associate = (models) => {
    Services.belongsToMany(models.Extras, {
      through: 'services_extra',
      as: 'serviceExtras',
      foreignKey: 'id_services',
      otherKey: 'id_extras',
    });

    Services.belongsToMany(models.NeedToBeDone, {
      through: 'services_need',
      as: 'serviceNeeds',
      foreignKey: 'id_services',
      otherKey: 'id_need',
    });
  };

  return Services;
};
