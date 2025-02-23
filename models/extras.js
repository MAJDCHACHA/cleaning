import { DataTypes } from 'sequelize';
export default (sequelize) => {
  const extras = sequelize.define('extras', {
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
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    isMulti: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isDeleted:{
      type:DataTypes.BOOLEAN,
      defaultValue:false,
    }
  }, {
    timestamps: false,
    tableName: 'extras',
  });

  // Define many-to-many association
  // extras.associate = (models) => {
  //   extras.belongsToMany(models.services, {
  //     through: 'services_extra',
  //     as: 'services',
  //     foreignKey: 'id_extras',
  //     otherKey: 'id_services',
  //   });
  // };
  extras.associate = (models) => {
        extras.belongsToMany(models.services, {
          through: models.services_extra,
          as: 'services',
          foreignKey: 'id_extras',
        });}
  extras.associate = (models) => {
    extras.belongsToMany(models.orders, {
      through: 'order_extra',
      as: 'orders',
      foreignKey: 'id_extra',
      otherKey: 'id_order',
    });
  };
  

  return extras;
};

