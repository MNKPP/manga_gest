import db from '../models/index.js';
import { AnimeListDto } from "../dto/animeList.dto.js";

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

    delete: async () => {

    },

    update: async () => {

    },

    getById: async () => {

    },

    getAll: async () => {

    }
}

export default animeListService;