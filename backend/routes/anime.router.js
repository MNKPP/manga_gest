import express from "express";
import {authorizeMiddleware} from "../middlewares/auth.middleware.js";
import animeController from "../controllers/anime.controller.js";
import episodeController from "../controllers/episode.controller.js";

const ROLE = 'user';

const animeRouter = express.Router();

animeRouter.route('/:id')
    .get(authorizeMiddleware(ROLE), animeController.getById);

animeRouter.route('/:id/increment')
    .put(authorizeMiddleware(ROLE), episodeController.increment);

animeRouter.route('/:id/decrement')
    .put(authorizeMiddleware(ROLE), episodeController.decrement);


export default animeRouter;