import animeListService from "../services/animeList.service.js";
import { animeListValidator } from "../validators/animeList.validator.js";
import {animeValidator} from "../validators/anime.validator.js";
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
        const memberId = req.token.id;

        const animeLists = await animeListService.getAll(memberId);

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

    addAnimeInList: async (req, res) => {
        const memberId = req.token.id;
        const data = req.body;
        const animeListId = parseInt(req.params.id);

        let validationData;
        try {
            validationData = await animeValidator.validate(data);
        } catch (e) {
            res.status(400)
                .json({
                    errorMessage: 'Invalid data'
                })
            return;
        }

        const checkedAnimeInList = await animeListService.checkIfAnimeInList(data.title, animeListId);

        if (!checkedAnimeInList) {
            res.status(409)
                .json({
                    errorMessage: 'Anime already exists in list'
                });
            return;
        }

        const anime = await animeListService.addAnimeInList(memberId, validationData, animeListId);

        if (!anime) {
            res.status(403)
                .json({
                    errorMessage: 'Failed to add anime to list'
                })
            return;
        }

        res.status(201)
            .location(`/api/animes/${anime.id}`)
            .json(anime);
    },

    deleteAnimeInList: async (req, res) => {
        const animeId = parseInt(req.params.animeId);
        const animeListId = parseInt(req.params.id);

        const nbRowDeleted = await animeListService.deleteAnimeInList(animeId, animeListId);

        if (nbRowDeleted === 0) {
            res.status(404)
                .json({
                    errorMessage: 'Anime not found in list'
                });
            return;
        }

        res.sendStatus(204);
    },

    getAllAnimeInList: async (req, res) => {
        const animeListId = parseInt(req.params.id);

        const animeList = await animeListService.getAllAnimeInList(animeListId);

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
}

export default animeListController;