import { DataTypes } from 'sequelize';
export default (sequelize)=>{
    const available_time=sequelize.define("available_time",{
        text:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        isBlocked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
              isIn: [[true, false]], // Ensure it is a boolean value
            },
          },
          isDeleted:{
            type:DataTypes.BOOLEAN,
            defaultValue:false,
          }
          

    },{
    timestamps: false,
    tableName: 'available_time'
    });
    return available_time;
}