import { DataTypes } from "sequelize";
export default (sequelize)=>{
    const Order_extra=sequelize.define("order_extra",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false,
        },
        id_order:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'orders',
                key:'id'
            }
        },
        id_extra:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'extras',
                key:"id"
            }
        },
        count:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }
    },{
        tableName:"order_extra",
        timestamps:false
    })
    return Order_extra
}