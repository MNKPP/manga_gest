import express from 'express';
import memberRouter from "./member.router.js";
import animeListRouter from "./animeList.router.js";

const mainRouter = express.Router();

mainRouter.use('/auth', memberRouter);
mainRouter.use('/animeList', animeListRouter)

export default mainRouter;