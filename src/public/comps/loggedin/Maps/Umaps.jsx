import React from 'react'
import UmapForms from './UmapForms'
import UmapBox from './UmapBox'
import "../../../css/loggedin/Umaps/umap.css"
import { useState, useEffect } from 'react'
import apiService from '../../../../features/apis/apiService';

function Umaps({ user, info, createConvo }) {

    const [userInfo, setUserInfo] = useState({
        name: "",
        lat: 12.8797,
        long: 121.7740,
        id: null,
        initialValues: true
    })
    const { name, lat, long, id } = userInfo

    const [newUserLocation, setNewUserLocation] = useState(null)


    const [markerPoints, setMarkerPoints] = useState({ gyms: [], coaches: [], spartners: [] })

    const [selectedLfs, setSelectedLfs] = useState([])

    const [lookingForMarts, setLookingForMarts] = useState([])

    const [resetCenterValue, setRecetCenterValue] = useState(null)



    useEffect(() => {
        if (newUserLocation === null) { return }
        console.log("NEW USER LOC: ", newUserLocation);
        updateUserInfo(newUserLocation.location.lat, newUserLocation.location.long)
        setRecetCenterValue([newUserLocation.location.lat, newUserLocation.location.long])
        updateUserDbLoc(newUserLocation)
    }, [newUserLocation])



    useEffect(() => {
        if (!info) { return }
        else {
            const newInfo = info.location.lat && info.location.long
                ? { lat: info.location.lat, long: info.location.long, id: info._id, name: info.name }
                : { lat: 12.8797, long: 121.7740, id: info._id, name: info.name }
            setUserInfo(newInfo)
            setRecetCenterValue([info.location.lat, info.location.long])
        }
    }, [info])

    const updateUserDbLoc = async () => {
        const response = await apiService.updateUserInfo(user, newUserLocation)
        return response
    }

    const updateUserInfo = (lat, long) => {
        setUserInfo((prevState) => { return { ...prevState, lat, long } })
    }

    const updateNewUserLocation = () => {
        setNewUserLocation({ location: { lat, long } })
    }


    const toggleLf = (lf) => {
        setSelectedLfs((prevState) => {
            if (prevState.includes(lf)) {
                const newValue = prevState.filter(item => item !== lf)
                return newValue
            } else {
                return [...prevState, lf]
            }
        })
    }

    const toggleLookingForMart = (mart) => {
        setLookingForMarts((prevState) => {
            if (prevState.includes(mart)) {
                const newState = prevState.filter(value => value !== mart)
                return newState
            } else {
                const newState = [...prevState, mart]
                return newState
            }
        })
    }

    const getMarkerLocations = async () => {
        const location = newUserLocation ? newUserLocation : { lat, long }

        if (selectedLfs.includes("GYM")) {
            const res = await apiService.findGyms(location, JSON.stringify(lookingForMarts))
            setMarkerPoints((prevState) => {
                const newState = { ...prevState, gyms: res.data.filter(item => item._id !== id) }
                return newState
            })
        } if (!selectedLfs.includes("GYM")) { setMarkerPoints((prevState) => { return { ...prevState, gyms: [] } }) }


        if (selectedLfs.includes("COACH")) {
            const res = await apiService.findCoach(location, JSON.stringify(lookingForMarts))
            setMarkerPoints((prevState) => {
                const newState = { ...prevState, coaches: res.data.filter(item => item._id !== id) }
                return newState
            })
        } if (!selectedLfs.includes("COACH")) { setMarkerPoints((prevState) => { return { ...prevState, coaches: [] } }) }

        if (selectedLfs.includes("SPARTNER")) {
            const res = await apiService.findSparringPartners(location, JSON.stringify(lookingForMarts))

            setMarkerPoints((prevState) => {
                const newState = { ...prevState, spartners: res.data.filter(item => item._id !== id) }
                return newState
            })
        } if (!selectedLfs.includes("SPARTNER")) { setMarkerPoints((prevState) => { return { ...prevState, spartners: [] } }) }
    }

    return (
        <div className='u-maps-page'>
            <UmapForms updateUserInfo={updateUserInfo} selectedLfs={selectedLfs} toggleLf={toggleLf} lookingForMarts={lookingForMarts} toggleLookingForMart={toggleLookingForMart}
                getMarkerLocations={getMarkerLocations} />
            <UmapBox userInfo={userInfo} updateNewUserLocation={updateNewUserLocation} resetCenterValue={resetCenterValue}
                updateUserInfo={updateUserInfo} markerPoints={markerPoints} name={name} id={id} createConvo={createConvo} />
        </div>
    )
}

export default Umaps