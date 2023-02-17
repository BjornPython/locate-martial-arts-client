import axios from "axios";


const GYM_API_ENDPOINT = "http://localhost:8000/api/gym"
const USERS_API_ENDPOINT = "http://localhost:8000/api/users"


const findGyms = async (location, marts) => { 
    console.log("apiservice MARTS: ", marts);
    console.log("apiService LOCATION: ", location);
    const response = await axios.post(`${GYM_API_ENDPOINT}/getgyms`, {location, marts}, {
        headers: { 
          'Content-Type': 'application/json',
        }
      })
    console.log(response);
    return response
}

const findSparringPartners = async (location, marts) => {
    console.log("IN FIND SPARRING PARTNERS");

    const response = await axios.post(`${USERS_API_ENDPOINT}/sparringusers`, {location, marts}, {
      headers: { 
        'Content-Type': 'application/json'
      }
    })

    if (response) { return response } else {return "no response from request"}
}


const findCoach = async (location, marts) => {
  console.log("IN FIND COACH");
  console.log("MARTS: ", marts);
  console.log("LOCATION: ", location);
  const response = await axios.post(`${USERS_API_ENDPOINT}/coachusers`, {location, marts}, {
    headers: { 
      'Content-Type': 'application/json'
    }
  })

  if (response) { return response } else {return "no response from request"}
}

const getGymInfo = async (token ) => {
  const response = await axios.get(GYM_API_ENDPOINT, {headers: {
    Authorization: `Bearer ${token}`
  }})
  return response
}

const getUserInfo = async (token) => {
  const response = await axios.get(USERS_API_ENDPOINT, {headers: {
    Authorization: `Bearer ${token}`
  }})
  return response
}

const updateUserInfo = async (token, newUserInfo) => {
  console.log("SENDING TOKEN: ", token);
  const response = await axios.post(USERS_API_ENDPOINT + "/update", {newUserInfo}, {headers: {
    Authorization: `Bearer ${token}`
  }})
  console.log("API SERVICE RESPONSE: ", response);
  return response
}

const updateGymInfo = async (token, profileGymInfo) => {
  const response = await axios.post(`${GYM_API_ENDPOINT}/update`, {profileGymInfo}, {headers: {
    Authorization: `Bearer ${token}`
  }})

  return response
}



const apiService = {
    findGyms, findSparringPartners, findCoach, getUserInfo, updateUserInfo, getGymInfo, updateGymInfo
}

export default apiService