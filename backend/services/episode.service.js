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

    moveAnime: async (animeId, memberId, listName) => {

        const episode = await db.Episode.findOne({ where: { animeId } });
        if (!episode) {
            throw new Error('Cannot find episode');
        }

        switch (listName) {
            case 'A voir':
                if (episode.watchedEpisode > 1) {
                    return false;
                }
                break;
            case 'En cours':
                if (episode.watchedEpisode === 0 || episode.watchedEpisode === episode.totalEpisodes) {
                    return false;
                }
                break;
            case 'Terminé':
                if (episode.watchedEpisode !== episode.totalEpisodes) {
                    return false;
                }
                break;
            default:
                throw new Error('Invalid list name');
        }

        const anime = await db.Anime.findOne({ where: { id: animeId } });

        if (!anime) {
            throw new Error('Cannot find Anime');
        }

        const animeList = await db.AnimeList.findOne({
            where: {
                name: listName,
                memberId
            }
        });
        if (!animeList) {
            throw new Error('Cannot find animeList');
        }

        await db.Anime.update({ animeListId: animeList.id }, {
            where: {
                id: animeId
            },
        });

        return true;
    },

    addEpisodeOnAddingAnime: async (memberId, animeId, totalEpisodes, listName) => {

            let episode;
            switch (listName) {
                case 'A voir':
                    episode = await db.Episode.create({memberId, animeId, watchedEpisode: 0, totalEpisodes });
                    break;
                case 'En cours':
                    episode = await db.Episode.create({memberId, animeId, watchedEpisode: 1, totalEpisodes });
                    break;
                case 'Terminé':
                    episode = await db.Episode.create({memberId, animeId, watchedEpisode: totalEpisodes, totalEpisodes });
                    break;
                default :
                    throw new Error('Invalid list name');
            }

            if (!episode) {
                throw new Error(`Cannot find episode`);
            }

            return new EpisodeDto(episode);
        },
    }

export default episodeService;