import { DataTypes } from "sequelize";
export default (sequelize) => {
  const services_need = sequelize.define("services_need", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_services: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_need: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    timestamps: false,
    tableName: "services_need",
  });

  return services_need;
};
