import axios from "axios";

const BASE_URL = 'https://api.jikan.moe/v4/anime';

export const fetchAnimeOnJikan = async (searchBarText) => {
    const response = await axios.get(BASE_URL, {
        params: {
            q: searchBarText,
            type: "tv",
        }
    });

    return response;
}

export const fetchRecommandations = async (token) => {
    const response = await axios.get('http://localhost:8080/api/anime/recommendation', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response;
}