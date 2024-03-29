import db from '../models/index.js';
import { AnimeListDto } from "../dto/animeList.dto.js";
import {AnimeDto} from "../dto/anime.dto.js";

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

    addAnimeInList: async (animeData, animeListId) => {
        const [animeCreated, created] = await db.Anime.findOrCreate({
            where: {...animeData, animeListId}
        });

        if (!created) {
            throw new Error('Anime already in list');
        }

        return new AnimeDto(animeCreated);
    }
}

export default animeListService;