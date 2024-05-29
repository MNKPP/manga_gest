import axios from "axios";

export const memberDetails = async (token) => {
    let response;
    try {
        response = await axios.get(`http://localhost:8080/api/auth/member`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log(error);
    }

    return response;
}
