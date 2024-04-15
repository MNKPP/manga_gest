import db from '../models/index.js';
import {EpisodeDto} from "../dto/episode.dto.js";

const episodeService = {
    increment: async (memberId, animeId) => {
        const episode = await db.Episode.findOne({
            where: {
                memberId,
                animeId
            }
        })

        if(!episode) {
            throw new Error(`Cannot find episode`);
        }

        episode.watchedEpisode += 1;
        await episode.save();

        return new EpisodeDto(episode);
    },

    decrement: async (memberId, animeId) => {
        const episode = await db.Episode.findOne({
            where: {
                memberId,
                animeId
            }
        })

        if (!episode) {
            throw new Error(`Cannot find episode`);
        }

        episode.watchedEpisode -= 1;
        await episode.save();

        return new EpisodeDto(episode);
    }
}

export default episodeService;