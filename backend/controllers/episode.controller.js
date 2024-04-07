import episodeService from "../services/episode.service.js";

const episodeController = {
    increment: async (req, res) => {
        const memberId = req.token.id;
        const animeId = parseInt(req.params.id);

        await episodeService.increment(memberId, animeId);


    },

    decrement: async (req, res) => {

    }
}

export default episodeController;