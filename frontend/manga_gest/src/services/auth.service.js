import axios from 'axios';

export const registerService = async ({username, email, password, confirm}) => {

    let response;
    try {
        response = await axios.post('http://localhost:8080/api/auth/register', {
            username,
            email,
            password,
            confirm
        });
        console.log(response)
    } catch (e) {
        console.log(e.response);
    }

    return response;
}

export const loginService = async ({username, password}) => {
    let response;
    try {
        response = await axios.post('http://localhost:8080/api/auth/login', {
            username,
            password
        });
    } catch (e) {
        console.log(e.response);
    }

    return response;
}