import animeService from "../services/anime.service.js";

const animeController = {
    getById: async (req, res) => {
        const animeId = parseInt(req.params.id);

        const anime = await animeService.getById(animeId);

        if (!anime) {
            res.status(404)
                .json({
                    errorMessage: 'No anime found.'
                })
            return;
        }

        res.status(200)
            .json(anime);
    }
}

export default animeController;