import express from 'express';
import verify from '../middleware/verify.js';
import adminControllers from '../controllers/adminControllers.js';
const router=express.Router();
router.use(verify);
router.route("/getAll").get(adminControllers.getAll);
export default router;