import orderControllers from "../controllers/orderControllers.js";
import verify from '../middleware/verify.js'
import express from 'express';
const router= express.Router();
router.use(verify);
router.route('/add').post(orderControllers.Create_order);
router.route('/get').get(orderControllers.get_order);
router.route('/getById/:id').get(orderControllers.get_order_ByID);
router.route('/getMyOrder/:id').get(orderControllers.getMyOrder)
router.route('/edit/:id').put(orderControllers.edit_order);
router.route('/delete/:id').delete(orderControllers.delete_order);
router.route('/state/:id').put(orderControllers.editDeleted);
export default  router;