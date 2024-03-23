import express from "express";
import {authorizeMiddleware} from "../middlewares/auth.middleware.js";
import animeListController from "../controllers/animeList.controller.js";

const memberRouter = express.Router();

memberRouter.route('/:id')
    .post(authorizeMiddleware('user') ,animeListController.add)


export default memberRouter;