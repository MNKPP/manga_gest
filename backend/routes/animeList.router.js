import express from "express";
import {authorizeMiddleware} from "../middlewares/auth.middleware.js";
import animeListController from "../controllers/animeList.controller.js";

const ROLE = 'user';

const memberRouter = express.Router();

memberRouter.route('/:id')
    .post(authorizeMiddleware(ROLE) ,animeListController.add)
    .delete(authorizeMiddleware(ROLE) , animeListController.delete)


export default memberRouter;