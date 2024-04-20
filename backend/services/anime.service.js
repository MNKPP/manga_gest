import db from "../models/index.js";

const animeService = {
    getById: async (id) => {
        const anime = await db.Anime.findOne({ where: { id: id } });

        if (!anime) {
            throw new Error("Anime not found");
        }

        return anime;
    }
}
export default animeService;
