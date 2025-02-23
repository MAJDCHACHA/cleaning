import { DataTypes } from "sequelize";

export default (sequelize) => {
  const OrderNeed = sequelize.define("order_need", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
    },
    id_need: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "NeedToBeDone",
        key: "id",
      },
    },
    option:{
        type:DataTypes.INTEGER,
        allowNull:false
      }
  }, {
    tableName: "order_need",
    timestamps: false,
  });

  return OrderNeed;
};
