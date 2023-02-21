import axios from "axios"


const API_URL = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/users/`

const GYM_API_ENDPOINT = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/gym`


const registerUser = async (userData) => {
    const response = await axios.post(API_URL + "register", userData)
    console.log(response);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
}

const loginUser = async (userData) => {
    const response = await axios.post(API_URL + "login", {email: userData.email, password: userData.password})
    console.log("AUTHSERVICE RES: ", response);
    if (response.data) {
        console.log("RECEIVED RESPONSE DATA: ", response);
        localStorage.setItem("user", JSON.stringify(response.data.token))
        localStorage.setItem("type", JSON.stringify(response.data.type))
    }

    return response.data
}

const registerGym = async(gymData) => {
    console.log("IN AUTHSERVICE");
    const response = await axios.post(`${GYM_API_ENDPOINT}/register`, gymData)
    console.log("RESPONSE: ", response);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
        localStorage.setItem("userType", JSON.stringify(response.data))
    }
    console.log("REPONSE.DATA: ", response.data);
    return response.data
}


const authService = {
    registerUser, loginUser, registerGym
}

export default authService