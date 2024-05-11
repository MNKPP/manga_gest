import db from "../models/index.js";
import axios from "axios";

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
            const genres = anime.genre.split(', '); // Split the genres string into an array
            for (let genre of genres) {
                if (userProfile.has(genre)) {
                    score++;
                }
            }
        }
        return score;
    },

    getRecommendations: async (userId) => {
        const userProfile = await recommendationService.getUserProfile(userId);
        const allAnimeDetails = await recommendationService.getAllAnimeDetails(userProfile);
        const animeList = allAnimeDetails.data;
        const scoredAnime = animeList.map(anime => {
            return {anime: anime, score: recommendationService.scoreAnime(anime, userProfile)};
        })

        scoredAnime.sort((a, b) => b.score - a.score);

        return scoredAnime.slice(0, 10);
    }
}

export default recommendationService;