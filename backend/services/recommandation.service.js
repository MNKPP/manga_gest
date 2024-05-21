import db from "../models/index.js";
import axios from "axios";
import natural from 'natural';

const TfIdf = natural.TfIdf;

const recommendationService = {
    genreIdMap: new Map(),

    loadGenreIds: async () => {
        const response = await axios.get('https://api.jikan.moe/v4/genres/anime');
        response.data.data.forEach(genre => {
            recommendationService.genreIdMap.set(genre.name, genre.mal_id);
        });
    },

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
        });

        if (!animeFromFavoriteList) {
            throw new Error("Favorite list not found");
        }

        return animeFromFavoriteList.Animes.map(anime => {
            return {
                id: anime.id,
                genre: anime.genre,
                synopsis: anime.synopsis
            };
        });
    },

    getAllAnimeDetails: async (userProfile) => {
        await recommendationService.loadGenreIds();
        const genreIds = Array.from(userProfile).map(genre => recommendationService.genreIdMap.get(genre) || '').filter(id => id !== '');
        const preferredGenres = genreIds.join(',');

        let allAnimeDetails = [];
        let currentPage = 1;
        let totalPages = 19;

        let requestCount = 0;
        let startTime = Date.now();

        do {
            const response = await axios.get(`https://api.jikan.moe/v4/anime?q=&page=${currentPage}&genre=${preferredGenres}&type=tv`);
            const data = response.data.data;
            allAnimeDetails = allAnimeDetails.concat(data);

            currentPage++;
            requestCount++;

            await new Promise(resolve => setTimeout(resolve, 1000));

            if (requestCount >= 20) {
                const elapsedSeconds = (Date.now() - startTime) / 1000;
                const remainingTime = 60 - elapsedSeconds > 0 ? 60 - elapsedSeconds : 0;
                await new Promise(resolve => setTimeout(resolve, remainingTime * 1000));
                requestCount = 0;
                startTime = Date.now();
            }

        } while (currentPage <= totalPages);

        return allAnimeDetails;
    },

    getUserProfile: async (userId) => {
        const userPreferences = await recommendationService.getUserPreferences(userId);
        const userProfile = new Set();

        userPreferences.forEach(anime => {
            anime.genre.split(', ').forEach(genre => {
                userProfile.add(genre.trim());
            });
        });

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

    cosineSimilarity: (vec1, vec2) => {
        const dotProduct = vec1.reduce((acc, current, idx) => acc + (current * vec2[idx]), 0);
        const magnitude1 = Math.sqrt(vec1.reduce((acc, val) => acc + (val * val), 0));
        const magnitude2 = Math.sqrt(vec2.reduce((acc, val) => acc + (val * val), 0));
        return dotProduct / (magnitude1 * magnitude2);
    },

    getRecommendations: async (userId) => {
        const tfidf = new TfIdf();
        const userPreferences = await recommendationService.getUserPreferences(userId);
        const allAnimeDetails = await recommendationService.getAllAnimeDetails(await recommendationService.getUserProfile(userId));

        userPreferences.forEach(anime => {
            if (anime.synopsis) {
                tfidf.addDocument(anime.synopsis);
            }
        });

        allAnimeDetails.forEach(anime => {
            if (anime.synopsis) {
                tfidf.addDocument(anime.synopsis);
            }
        });

        const documentVectors = [];
        for (let i = 0; i < tfidf.documents.length; i++) {
            documentVectors.push(tfidf.listTerms(i).map(term => term.tfidf));
        }

        const userProfileVector = documentVectors.slice(0, userPreferences.length).reduce((acc, vec) => {
            return acc.map((val, idx) => val + (vec[idx] || 0));
        }, new Array(documentVectors[0].length).fill(0)).map(val => val / userPreferences.length);

        const scoredAnime = (await Promise.all(allAnimeDetails.map(async (anime, index) => {
            let similarityScore = 0;
            let genreScore = recommendationService.scoreAnime(anime, await recommendationService.getUserProfile(userId));
            let vectorIndex = index + userPreferences.length;

            if (documentVectors[vectorIndex].length > 0) {
                similarityScore = recommendationService.cosineSimilarity(userProfileVector, documentVectors[vectorIndex]);
            }

            const totalScore = 0.3 * genreScore + 0.7 * similarityScore;

            return {
                anime,
                score: totalScore,
                similarityScore
            };
        })))
            .filter(item => item.similarityScore > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);

        return scoredAnime;
    }
}

export default recommendationService;