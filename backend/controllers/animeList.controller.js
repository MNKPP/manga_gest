import animeListService from "../services/animeList.service.js";
import { animeListValidator } from "../validators/animeList.validator.js";
import res from "express/lib/response.js";

const animeListController = {

    add: async (req, res) => {
        const data = req.body;
        const memberId = req.token.id;

        let validationData
        try {
            validationData = await animeListValidator.validate(data);
        } catch (e) {
            res.status(400)
                .json({
                    errorMessage: 'Invalid data'
                });
            return;
        }

        const animeList = await animeListService.add(validationData, memberId);

        if (!animeList) {
            res.status(401)
                .json({
                    errorMessage: 'Failed to add anime list'
                });
            return;
        }

        res.status(201)
            .location(`/api/animes/${animeList.id}`)
            .json(animeList);
    },

    delete: async (req, res) => {
        const animeListId = parseInt(req.params.id);

        if (animeListId <= 4) {
            res.status(403)
                .json({
                    errorMessage: 'Cannot delete default anime list'
                });
            return;
        }

        const isDeleted = await animeListService.delete(animeListId);

        if(!isDeleted) {
            res.status(400)
                .json({
                    errorMessage: 'Failed to delete anime list'
                })
            return;
        }

        res.sendStatus(204);
    },

    update: async (req, res) => {
        const data = req.body;
        const animeListId = parseInt(req.params.id);

        let validationData;
        try {
            validationData = await animeListValidator.validate(data);
        } catch (e) {
            res.status(400)
                .json({
                    errorMessage: 'Invalid data'
                })
            return;
        }

        const animeList = await animeListService.update(validationData, animeListId);

        if (!animeList) {
            res.status(403)
                .json({
                    errorMessage: 'Failed to update anime list'
                })
            return;
        }

        res.status(200)
            .json(animeList)
    },

    getById: async (req, res) => {
        const animeListId = parseInt(req.params.id);

        const animeList = await animeListService.getById(animeListId);

        if (!animeList) {
            res.status(404)
                .json({
                    errorMessage: 'AnimeList Not Found'
                });
            return;
        }

        res.status(200)
            .json(animeList);
    },

    getAll: async (req, res) => {
        const animeLists = await animeListService.getAll();

        if (animeLists.length === 0) {
            res.status(404)
                .json({
                    errorMessage: 'AnimeLists Not Found'
                });
            return;
        }

        res.status(200)
            .json(animeLists);

        },
}

export default animeListController;