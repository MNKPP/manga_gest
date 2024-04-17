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

        const animeMoved = await episodeService.moveAnimeIfFinished(animeId, memberId);

        if (!animeMoved) {
            console.log('Not Moved')
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

        const animeMoved = await episodeService.moveAnimeToWatching(animeId, memberId);

        if (!animeMoved) {
            console.log('Not Moved')
        }

        res.status(200)
            .json(episode);
    },

    addEpisodeOnAddingAnime: async (req, res) => {
        const memberId = req.token.id;
        const animeId = parseInt(req.params.id);
        const totalEpisodes = parseInt(req.body.episodes);

        const episode = await episodeService.addEpisodeOnAddingAnime(memberId, animeId, totalEpisodes);

        if (!episode) {
            res.status(404)
                .json({
                    errorMessage: 'No episode found',
                })
            return;
        }

        res.status(200)
            .json({
                message: 'Episode added successfully',
            });
    }
}

export default episodeController;