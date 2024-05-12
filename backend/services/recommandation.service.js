import db from "../models/index.js";
import axios from "axios";
import {AnimeDto} from "../dto/anime.dto.js";
import natural from 'natural';
const TfIdf = natural.TfIdf;

const recommendationService = {
    getUserPreferences: async (userId) => {
        const animeFromFavoriteList = await db.AnimeList.findOne({
            where: {
                name: "Favoris",
                memberId: userId
            },
            include: [{
                model: db.Anime,
                required: true
            }]
        })

        if (!animeFromFavoriteList) {
            throw new Error("Favorite list not found");
        }

        // map the Animes to reduce the depth
        return animeFromFavoriteList.Animes.map(anime => anime.dataValues);
    },

    getAllAnimeDetails: async (userProfile) => {
        const preferredGenres = Array.from(userProfile).join(',');

        const animeDetailsResponse = await axios.get(`https://api.jikan.moe/v4/anime?q=&genre=${preferredGenres}&score=8&type=tv`);

        return animeDetailsResponse.data;
    },

    getUserProfile: async (userId) => {
        const userPreferences = await recommendationService.getUserPreferences(userId);
        const userProfile = new Set();

        for (let anime of userPreferences) {
            const genres = anime.genre.split(', ');
            for (let genre of genres) {
                userProfile.add(genre.trim());
            }
        }

        return userProfile;
    },

    scoreAnime: (anime, userProfile) => {
        let score = 0;
        if (anime && anime.genre) {
            const genres = anime.genre.split(', ');
            for (let genre of genres) {
                if (userProfile.has(genre)) {
                    score++;
                }
            }
        }
        return score;
    },

    getRecommendations: async (userId) => {
        const tfidf = new TfIdf();

        const userProfile = await recommendationService.getUserProfile(userId);
        const allAnimeDetails = await recommendationService.getAllAnimeDetails(userProfile);
        const animeList = allAnimeDetails.data;

        // calculate tf-idf
        animeList.forEach(anime => {
            if (anime.synopsis) {
                tfidf.addDocument(anime.synopsis);
            }
        });

        const scoredAnime = animeList.map(anime => {
            const animeDto = new AnimeDto(anime);
            let scoreTfIdf = 0;

            if (animeDto.synopsis) {
                const terms = tfidf.listTerms(tfidf.documents.length - 1).slice(0, 10); // consider top 10 (can be adjusted) terms only
                terms.forEach(term => {
                    scoreTfIdf += term.tfidf;
                });
            }

            return {
                anime: animeDto,
                score: recommendationService.scoreAnime(animeDto, userProfile) + scoreTfIdf // add score from tf-idf to the previous score
            };
        });

        scoredAnime.sort((a, b) => b.score - a.score);

        return scoredAnime.slice(0, 10); // return top 10 anime
    }
}

export default recommendationService;