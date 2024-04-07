import db from '../models/index.js';

const episodeService = {
    increment: async (memberId, animeId) => {
        const episode = await db.Episode.findOne({
            where: {
                memberId,
                animeId
            }
        })

        console.log(episode)

        if(episode) {
            episode.watchedEpisode += 1;
            await episode.save();
        }
    },

    decrement: async (memberId, animeId) => {

    }
}

export default episodeService;