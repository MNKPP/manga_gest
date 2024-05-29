import express from "express";
import memberController from "../controllers/member.controller.js";
import {authorizeMiddleware} from "../middlewares/auth.middleware.js";

const memberRouter = express.Router();

memberRouter.route('/login')
    .post(memberController.login)

memberRouter.route('/register')
    .post(memberController.register)

memberRouter.get('/protected', authorizeMiddleware('user') , async (req, res) => {
    res.sendStatus(200)
})

memberRouter.route('/member')
    .get(authorizeMiddleware('user'), memberController.getById)

export default memberRouter;