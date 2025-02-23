import express from "express";
import verify from '../middleware/verify.js';
import needToBeDoneControllers from "../controllers/needToBeDoneControllers.js";
const router=express.Router();
router.route("/unAuth/get").get(needToBeDoneControllers.getAll);
router.use(verify);
router.route("/add").post(needToBeDoneControllers.Create_needToBeDone);
router.route("/get").get(needToBeDoneControllers.getAll);
router.route("/getById/:id").get(needToBeDoneControllers.getByKy);
router.route("/edit/:id").put(needToBeDoneControllers.edit);
router.route("/delete/:id").delete(needToBeDoneControllers.delete_need);
router.route("/put_edit/:id").put(needToBeDoneControllers.editDeleted)
export default router;
