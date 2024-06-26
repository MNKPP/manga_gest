import db from '../models/index.js';
import { AnimeListDto } from "../dto/animeList.dto.js";
import {AnimeDto} from "../dto/anime.dto.js";
import episodeService from "./episode.service.js";

const animeListService = {

    addDefaultList: async (memberId) => {
        const defaultLists = ["En cours", "A voir", "Terminé", "Favoris"];

        await db.AnimeList.bulkCreate(
            defaultLists.map(name => ({name, memberId}))
        )
    },

    add: async (animeListData, memberId) => {
        const [animeListCreated, created] = await db.AnimeList.findOrCreate({
            where: {name: animeListData.name, memberId, isDefault: false}
        });

        if (!created) {
            throw new Error('AnimeList Already Exists');
        }

        return new AnimeListDto(animeListCreated);
    },

    delete: async (animeListId) => {
        const animeListFound = await db.AnimeList.findOne({
            where: {id: animeListId},
        })

        if (animeListFound.isDefault) {
            throw new Error('Cannot delete default anime list');
        }

        const nbRowDeleted = await db.AnimeList.destroy({
            where: {id: animeListId}
        });

        return nbRowDeleted;
    },

    update: async (animeListData, animeListId) => {
        const [updateCount] = await db.AnimeList.update(animeListData, {
            where: {id: animeListId}
        });

        if (!updateCount) {
            throw new Error('AnimeList Not Updated');
        }

        const updatedData = await db.AnimeList.findOne({ where: animeListId })

        return new AnimeListDto(updatedData);
    },

    getById: async (animeListId) => {
        const animeList = await db.AnimeList.findOne({ where: { id: animeListId } });

        if (!animeList) {
            throw new Error('AnimeList Not Found');
        }

        return new AnimeListDto(animeList);
    },

    getAll: async (memberId) => {
        const animeLists = await db.AnimeList.findAll({
            where : {memberId: memberId},
        })

        if (animeLists.length === 0) {
            throw new Error('No AnimeLists Found');
        }

        return animeLists.map(animeList => new AnimeListDto(animeList));
    },

    addAnimeInList: async (memberId, animeData, animeListId) => {

        const data = {
            title: animeData.title,
            studio: animeData.studio,
            genre: animeData.genre,
            image: animeData.image,
            score: animeData.score,
            synopsis: animeData.synopsis,
            animeListId: animeListId,
        }

        const [animeCreated, created] = await db.Anime.findOrCreate({
            where: {...data, animeListId}
        });

        if (!created) {
            throw new Error('Anime already in list');
        }

        const listName = await db.AnimeList.findOne({ where: { id: animeListId } });

        if (!listName) {
            throw new Error('AnimeList Not Found');
        }

        const addedEpisode = episodeService.addEpisodeOnAddingAnime(memberId, animeCreated.id, animeData.episodes, listName.name)

        if (!addedEpisode) {
            throw new Error('Cannot add episode on adding anime');
        }

        return new AnimeDto(animeCreated);
    },

    deleteAnimeInList: async (animeId, animeListId) => {

        const animeInList = await db.Anime.findOne({
            where: {id: animeId, animeListId}
        })

        if (!animeInList) {
            throw new Error('Anime not found in list');
        }

        const nbRowDeleted = await db.Anime.destroy({
            where: {id: animeId, animeListId}
        });

        return nbRowDeleted;
    },

    getAllAnimeInList: async (animeListId) => {
        const animeList = await db.Anime.findAll({
            where: { animeListId },
            include: [
                {
                    model: db.AnimeList,
                    required: true
                },
                {
                    model: db.Episode,
                    required: true
                }
            ]
        });

        if (!animeList) {
            throw new Error('AnimeList Not Found');
        }

        return animeList;
    },

    checkIfAnimeInList: async (title, animeListId) => {
        const animeInList = await db.Anime.findOne({
            where: {
                title: title,
                animeListId: animeListId
            },
            include : [
                {
                    model: db.AnimeList,
                    required: true,
                }
            ]
        });


        if (!animeInList) {
            return true;
        } else {
            return false;
        }
    },

}

export default animeListService;