import express from "express";
import {authorizeMiddleware} from "../middlewares/auth.middleware.js";
import animeListController from "../controllers/animeList.controller.js";

const ROLE = 'user';

const memberRouter = express.Router();

memberRouter.route('/:id')
    .get(authorizeMiddleware(ROLE), animeListController.getById)
    .put(authorizeMiddleware(ROLE) ,animeListController.update)
    .delete(authorizeMiddleware(ROLE) , animeListController.delete)

memberRouter.route('/:id/anime')
    .get(authorizeMiddleware(ROLE) ,animeListController.getAllAnimeInList)
    .post(authorizeMiddleware(ROLE) ,animeListController.addAnimeInList)

memberRouter.route('/:id/anime/:animeId')
    .delete(authorizeMiddleware(ROLE) ,animeListController.deleteAnimeInList)

memberRouter.route('/')
    .get(authorizeMiddleware(ROLE), animeListController.getAll)
    .post(authorizeMiddleware(ROLE) ,animeListController.add)


export default memberRouter;