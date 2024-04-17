import db from '../models/index.js';
import {EpisodeDto} from "../dto/episode.dto.js";

const episodeService = {
    increment: async (memberId, animeId) => {
        const episode = await db.Episode.findOne({
            where: {
                memberId,
                animeId
            }
        });

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
        });

        if (!episode) {
            throw new Error(`Cannot find episode`);
        }

        episode.watchedEpisode -= 1;
        await episode.save();

        return new EpisodeDto(episode);
    },

    moveAnimeIfFinished: async (animeId, memberId) => {
        const episode = await db.Episode.findOne({
            where: {
                animeId
            }
        });

        if (!episode) {
            throw new Error(`Cannot find episode`);
        }

        if (episode.watchedEpisode === episode.totalEpisodes) {

            const anime = await db.Anime.findOne({
                where: {
                    id: animeId
                }
            });

            if (!anime) {
                throw new Error(`Cannot find Anime`);
            }

            const animeList = await db.AnimeList.findOne({
                where: {
                    name: 'Terminé',
                    memberId
                }
            });

            if (!animeList) {
                throw new Error(`Cannot find animeList`);
            }

            await db.Anime.update({ animeListId: animeList.id },{
                where: {
                    id: animeId
                },
            });

            return true;
        }

        return false;
    },

    moveAnimeToWatching: async (animeId, memberId) => {
        const episode = await db.Episode.findOne({
            where: {
                animeId
            }
        });

        if (!episode) {
            throw new Error(`Cannot find episode`);
        }

        if (episode.watchedEpisode < episode.totalEpisodes) {

            const anime = await db.Anime.findOne({
                where: {
                    id: animeId
                }
            });

            if (!anime) {
                throw new Error(`Cannot find Anime`);
            }

            const animeList = await db.AnimeList.findOne({
                where: {
                    name: 'En cours',
                    memberId
                }
            });

            if (!animeList) {
                throw new Error(`Cannot find animeList`);
            }

            await db.Anime.update({ animeListId: animeList.id },{
                where: {
                    id: animeId
                },
            });

            return true;
        }

        return false;
    },

    addEpisodeOnAddingAnime: async (memberId, animeId, totalEpisodes) => {
        const episode = await db.Episode.create({memberId, animeId, watchedEpisode: 0, totalEpisodes });

        if (!episode) {
            throw new Error(`Cannot find episode`);
        }

        return new EpisodeDto(episode);
    }
}

export default episodeService;