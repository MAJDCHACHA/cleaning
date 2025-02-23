import express from 'express';
import  authControllers from '../controllers/authControllers.js';

const router=express.Router();
// Route admin
router.route("/admin/register").post(authControllers.register_admin);
router.route("/admin/login").post(authControllers.login_admin);
router.route("/admin/refresh").get(authControllers.refresh_admin);
router.route("/admin/logout").post(authControllers.logout_admin);
// Route of user
router.route("/user/register").post(authControllers.register_user);
router.route("/user/login").post(authControllers.login_user);
router.route("/user/refresh").get(authControllers.refresh_user);
router.route("/user/logout").post(authControllers.logout_user);
export default router;