import db from "../models/index.js";

const recommendationService = {


    getUserPreferences: async (userId) => {
        const animeFromfavoriteList = await db.AnimeList.findOne({
            where: {
                name: "Favoris",
                memberId: 1
            },
            include: db.Anime
        })

        if (!animeFromfavoriteList) {
            throw new Error("Favorite list not found");
        }

        return animeFromfavoriteList;
    },

    getAllAnimeFeatures: () => {

    }
}

export default recommendationService;