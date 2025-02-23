import express from 'express';
import verify from '../middleware/verify.js';
import availableControllers from '../controllers/availableControllers.js';
const router=express.Router();
router.use(verify);
router.route('/add').post(availableControllers.create_available_time);
router.route('/get').get(availableControllers.getAll);
router.route('/getById/:id').get(availableControllers.getById);
router.route('/editById/:id').put(availableControllers.edit);
router.route('/editBlocked/:id').put(availableControllers.editBlocked);
router.route('/delete/:id').delete(availableControllers.deleteById);
router.route("/put_edit/:id").put(availableControllers.editDeleted)
export default router;