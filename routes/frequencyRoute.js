import express from 'express';
import frequencyControllers from '../controllers/frequencyControllers.js';
import verify from '../middleware/verify.js';
const router=express.Router();
router.use(verify);
router.route("/add").post(frequencyControllers.create_frequency);
router.route("/get").get(frequencyControllers.getAll)
router.route("/getById/:id").get(frequencyControllers.getByKy)
router.route("/edit/:id").put(frequencyControllers.edit);
router.route("/delete/:id").delete(frequencyControllers.delete_frequency);
router.route("/put_edit/:id").put(frequencyControllers.editDeleted)
export default router;