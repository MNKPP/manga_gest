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