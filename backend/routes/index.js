import express from 'express';
import memberRouter from "./member.router.js";

const mainRouter = express.Router();

mainRouter.use('/auth', memberRouter);

export default mainRouter;