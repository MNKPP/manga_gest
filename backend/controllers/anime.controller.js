import animeService from "../services/anime.service.js";
import recommendationService from "../services/recommandation.service.js";

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
    },

    getRecommendations: async (req, res) => {
        const userId = req.token.id
        console.log('user = ', userId)
        const recommendations = await recommendationService.getRecommendations(userId);

        if (!recommendations) {
            res.status(404)
                .json({
                    errorMessage: 'No recommendations found.'
                });
            return;
        }

        res.status(200)
            .json(recommendations);
    },
}

export default animeController;