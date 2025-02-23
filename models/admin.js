import { DataTypes } from 'sequelize';
export default (sequelize)=>{
    const Admin=sequelize.define("Admin",{
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            require:true
        }
    },{
         timestamps: false,
        tableName:'Admin'
    })
    return Admin;
}