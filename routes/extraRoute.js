import express from 'express';
import verify from '../middleware/verify.js'
import extraControllers from '../controllers/extraControllers.js'
const router=express.Router();
router.route("/unAuth/get").get(extraControllers.getAll)
router.use(verify);
router.route("/get").get(extraControllers.getAll)
router.route("/getById/:id").get(extraControllers.getByKy);
router.route("/add").post(extraControllers.upload.single('image'), extraControllers.Create_extras);
router.route("/edit/:id").put(extraControllers.upload.single('image'),extraControllers.edit);
router.route("/delete/:id").delete(extraControllers.delete_extra);
router.route("/put_edit/:id").put(extraControllers.editDeleted);

export default router;