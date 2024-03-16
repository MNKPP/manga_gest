import express from "express";
import memberController from "../controllers/member.controller.js";

const memberRouter = express.Router();

memberRouter.route('/login')
    .post(memberController.login)

memberRouter.route('/register')
    .post(memberController.register)

export default memberRouter;