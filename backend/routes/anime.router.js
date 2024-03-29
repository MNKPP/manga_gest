import express from "express";
import {authorizeMiddleware} from "../middlewares/auth.middleware.js";
import animeController from "../controllers/anime.controller.js";

const ROLE = 'user';

const animeRouter = express.Router();

animeRouter.route('/:id')
    .get(authorizeMiddleware(ROLE), animeController.getById)

export default animeRouter;