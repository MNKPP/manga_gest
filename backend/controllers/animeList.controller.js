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
        res.sendStatus(501);
    },

    getById: async (req, res) => {
        res.sendStatus(501);
    },

    getAll: async (req, res) => {
        res.sendStatus(501);
        },
}

export default animeListController;