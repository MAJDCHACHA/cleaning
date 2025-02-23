import express from "express";
import verify from '../middleware/verify.js';
import servicesControllers from "../controllers/servicesControllers.js";
const router = express.Router();
router.route("/unAuth/get").get(servicesControllers.get)
router.use(verify);
router.route("/add").post(servicesControllers.create_services);
router.route("/get").get(servicesControllers.get)
router.route('/getById/:id').get(servicesControllers.getById);
router.route('/edit/:id').put(servicesControllers.edit_service);
router.route("/deleteById/:id").delete(servicesControllers.delete_service);
router.route("/put_edit/:id").put(servicesControllers.editDeleted);
export default router; 