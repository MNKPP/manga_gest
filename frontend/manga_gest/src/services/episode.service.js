import axios from "axios";

export const incrementEpisodes = async (id, token) => {
    let response;
    try {
        response = await axios.put(`http://localhost:8080/api/anime/${id}/increment`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log(error);
    }

    return response;
}

export const decrementEpisodes = async (id, token) => {
    let response;
    try {
        response = await axios.put(`http://localhost:8080/api/anime/${id}/decrement`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log(error);
    }

    return response;
}