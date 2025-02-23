import { DataTypes } from "sequelize";
export default (sequelize) => {
  const NeedToBeDone = sequelize.define("NeedToBeDone", {
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
    option: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isDeleted:{
      type:DataTypes.BOOLEAN,
      defaultValue:false,
    }
  }, {
    timestamps: false,
    tableName: "need_to_be_done",
  });

  // Define many-to-many association
  NeedToBeDone.associate = (models) => {
    NeedToBeDone.belongsToMany(models.services, {
      through: 'services_need',
      as: 'services',
      foreignKey: 'id_need',
      otherKey: 'id_services',
    });
  };
  NeedToBeDone.associate = (models) => {
    NeedToBeDone.belongsToMany(models.orders, {
      through: 'order_need',
      as: 'orders',
      foreignKey: 'id_need',
      otherKey: 'id_order',
    });
  };
  return NeedToBeDone;
};
