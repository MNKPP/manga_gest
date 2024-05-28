import axios from "axios";

export const addList = async (token, data) => {
    let response;
    try {
        response = await axios.post(`http://localhost:8080/api/animeList`, data,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response)
    } catch (error) {
        throw new Error(error);
    }

    return response;
}

export const fetchAnimeInList = async (id, token) => {

    let response;
    try {
        response = await axios.get(`http://localhost:8080/api/animeList/${id}/anime`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        throw new Error(error.message);
    }

    return response;
}

export const fetchAnimeLists = async (token) => {

    let response;
    try {
        response = await axios.get(`http://localhost:8080/api/animeList`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        throw new Error(error.message);
    }

    return response;
}

export const addAnimeInList = async (id, data, token) => {

    let response;
    try {
        response = await axios.post(`http://localhost:8080/api/animeList/${id}/anime`, {...data}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        throw new Error(error.message);
    }

    return response;
}

export const deleteAnimeInList = async (id, animeId, token) => {

    let response;
    try {
        response = await axios.delete(`http://localhost:8080/api/animeList/${id}/anime/${animeId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log(error);
    }

    return response;
}

export const addToFavorites = async (animeId, token) => {
    let response;
    try {
        response = await axios.post(`http://localhost:8080/api/animeList/addToFavorite/${animeId}`, { animeId }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        throw new Error(error.message);
    }

    return response;
}