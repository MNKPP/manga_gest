import episodeService from "../services/episode.service.js";

const episodeController = {
    increment: async (req, res) => {
        const memberId = req.token.id;
        const animeId = parseInt(req.params.id);

        const episode = await episodeService.increment(memberId, animeId);

        if (!episode) {
            res.status(404)
                .json({
                    errorMessage: 'No episode found',
                })
            return;
        }

        if (episode.watchedEpisode === episode.totalEpisodes) {
            await episodeService.moveAnime(animeId, memberId, 'Terminé');
        } else if (episode.watchedEpisode === 1) {
            await episodeService.moveAnime(animeId, memberId, 'En cours');
        }

        res.status(200)
            .json(episode);
    },

    decrement: async (req, res) => {
        const memberId = req.token.id;
        const animeId = parseInt(req.params.id);

        const episode = await episodeService.decrement(memberId, animeId);

        if (!episode) {
            res.status(404)
                .json({
                    errorMessage: 'No episode found',
                })
            return;
        }

        if (episode.watchedEpisode === 0) {
            await episodeService.moveAnime(animeId, memberId, 'A voir');
        } else if (episode.watchedEpisode < episode.totalEpisodes) {
            await episodeService.moveAnime(animeId, memberId, 'En cours');
        }

        res.status(200)
            .json(episode);
    }
}

export default episodeController;