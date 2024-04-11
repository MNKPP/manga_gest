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