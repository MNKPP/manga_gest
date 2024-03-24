import db from '../models/index.js';
import { AnimeListDto } from "../dto/animeList.dto.js";
import {Error} from "sequelize";

const animeListService = {

    addDefaultList: async (memberId) => {
        const defaultLists = ["En cours", "A voir", "Terminé", "Favoris"];

        await db.AnimeList.bulkCreate(
            defaultLists.map(name => ({name, memberId}))
        )
    },

    add: async (animeListData, memberId) => {
        const [animeListCreated, created] = await db.AnimeList.findOrCreate({
            where: {name: animeListData.name, memberId}
        });

        if (!created) {
            throw new Error('AnimeList Already Exists');
        }

        return new AnimeListDto(animeListCreated);
    },

    delete: async (animeLisId) => {
        const nbRowDeleted = await db.AnimeList.destroy({
            where: {id: animeLisId}
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

    },

    getAll: async () => {

    }
}

export default animeListService;