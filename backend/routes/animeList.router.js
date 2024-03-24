import express from "express";
import {authorizeMiddleware} from "../middlewares/auth.middleware.js";
import animeListController from "../controllers/animeList.controller.js";

const ROLE = 'user';

const memberRouter = express.Router();

memberRouter.route('/:id')
    .get(authorizeMiddleware(ROLE), animeListController.getById)
    .post(authorizeMiddleware(ROLE) ,animeListController.add)
    .put(authorizeMiddleware(ROLE) ,animeListController.update)
    .delete(authorizeMiddleware(ROLE) , animeListController.delete)

memberRouter.route('/')
    .get(authorizeMiddleware(ROLE), animeListController.getAll)


export default memberRouter;