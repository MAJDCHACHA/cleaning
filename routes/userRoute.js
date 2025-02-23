import express from 'express';
import userControllers from '../controllers/userControllers.js';
import verify from '../middleware/verify.js';

const router=express.Router();
router.use(verify);
router.route("/get").get(userControllers.getAll);
export default router;