import { DataTypes } from "sequelize";
export default (sequelize) => {
  const services_extra = sequelize.define("services_extra", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_extras: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: "services_extra",
  });

  return services_extra;
};
