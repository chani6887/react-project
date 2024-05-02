import axios from "axios"

let baseUrl = "https://node-project-7sbi.onrender.com/api/user";

export const userSignIn = (userDetails) => {
    try {
        return axios.post(`${baseUrl}/login`, userDetails);
    }
    catch (error) {
        return error;
    }
}

export const userSignUp = async (userDetails) => {
    return await axios.post(`${baseUrl}`, userDetails);
}

