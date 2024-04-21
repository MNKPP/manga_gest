import axios from "axios";

export const fetchAnimeInList = async (id, token) => {

    let response;
    try {
        response = await axios.get(`http://localhost:8080/api/animeList/${id}/anime`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log(error);
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
        console.log(error);
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
        console.log(error)
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