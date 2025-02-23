import { DataTypes } from "sequelize";
export default (sequelize) => {
  const frequency = sequelize.define(
    "frequency",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      discount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      isDeleted:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
      }
    },
    {
      timestamps: false,
      tableName: "frequency",
    }
  );
  return frequency;
};
