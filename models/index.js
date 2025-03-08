import Sequelize from "sequelize";
import sequelizeConfig from "../config/database.js";

import UserModel from "./user.js";
import OrderModel from "./orders.js";
import NeedToBeDoneModel from "./need_to_be_done.js";
import ServicesModel from "./services.js";
import ExtrasModel from "./extras.js";
import OrderNeedModel from "./order_need.js";
import OrderExtraModel from "./order_extra.js";
import ServicesNeedModel from "./services_need.js";
import ServicesExtraModel from "./services_extra.js";

const sequelize = new Sequelize(sequelizeConfig);

const models = {
  User: UserModel(sequelize),
  Orders: OrderModel(sequelize),
  NeedToBeDone: NeedToBeDoneModel(sequelize),
  Services: ServicesModel(sequelize),
  Extras: ExtrasModel(sequelize),
  OrderNeed: OrderNeedModel(sequelize),
  OrderExtra: OrderExtraModel(sequelize),
  ServicesNeed: ServicesNeedModel(sequelize),
  ServicesExtra: ServicesExtraModel(sequelize),
};

// تعريف العلاقات
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export { sequelize };
export default models;
