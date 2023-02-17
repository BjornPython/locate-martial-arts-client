import React, { useState } from 'react'
import "../../../css/loggedin/uprofile.css"
import apiService from '../../../../features/apis/apiService'
import GprofileBox from './GprofileBox'
import GprofileContents from './GprofileContents'
import { useEffect } from 'react'
function Gprofile({ user, gymInfo }) {

    // Used for adding martial arts and awards/Achievements
    const [newInfo, setNewInfo] = useState({
        addMart: "",
        addAward: ""
    })
    const { addMart, addAward } = newInfo
    const [isEditingInfo, setIsEditingInfo] = useState(false)
    const [showSave, setShowSave] = useState(false)
    const [dbGymInfo, setDbGymInfo] = useState(gymInfo)
    const [profileGymInfo, setProfileGymInfo] = useState({
        name: "",
        bio: "",
        marts: {},
        awards: [],
        initialValues: true
    })
    const { name, bio, marts, awards } = profileGymInfo


    useEffect(() => {
        console.log("NAME CHANGED");
        if (name === "" || profileGymInfo.initialValues) { return }
        console.log("NAME CHANGED");
        changeGymData()
    }, [name, bio])

    useEffect(() => {
        console.log("profile info changed");
        setProfileGymInfo(gymInfo)
        setDbGymInfo(JSON.parse(JSON.stringify({ ...gymInfo })))
    }, [gymInfo])

    const handleEditProfile = () => {
        if (!isEditingInfo) {
            setIsEditingInfo(!isEditingInfo)
            setShowSave(!showSave)
        } else {
            setIsEditingInfo(!isEditingInfo)
            setShowSave(!showSave)
            setProfileGymInfo(JSON.parse(JSON.stringify({ ...dbGymInfo })))
        }
    }

    const delMart = (mart) => {
        setProfileGymInfo(prevState => {
            const newState = { ...prevState }
            delete newState.marts[mart]
            return newState
        })
    }

    const handleNewInfo = ((e) => {
        setNewInfo((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    })

    const addNewInfo = (info, type = null) => {
        if (type) {
            setProfileGymInfo((prevState) => {
                const newState = { ...prevState };
                newState.marts = {
                    ...newState.marts,
                    [info]: true
                }
                return newState
            })
        } else {
            setProfileGymInfo(prevState => {
                console.log("INFO: ", info);
                const newState = {
                    ...prevState,
                    awards: [...prevState.awards, info]
                }
                return newState
            })

        }
    }

    const delAward = (award) => {
        setProfileGymInfo((prevState) => {
            const newState = { ...prevState };
            newState.awards = newState.awards.filter((item) => item !== award);
            return newState
        })
    }

    // GET THISS WORKINGG!!!!!!!!!!!!!!!!!!!
    const changeGymData = async () => {
        console.log("CHANGING DATA TO: ", profileGymInfo);
        const response = await apiService.updateGymInfo(user, profileGymInfo)
        console.log("RESPONSE: ", response);
        if (isEditingInfo) { setIsEditingInfo(false) }
        { showSave && setShowSave(false) }
    }

    const changeNameBio = async (newName, newBio) => {
        console.log("CJANGE NAME BIO CALLED");
        setProfileGymInfo((prevState) => {
            const newState = { ...prevState, name: newName, bio: newBio };
            console.log("NEW STATE: ", newState);
            return newState
        })
    }


    return (
        <div id='u-profile-page' className='u-profile-page'>
            <GprofileBox name={name} bio={bio} changeNameBio={changeNameBio} />
            <GprofileContents handleEditProfile={handleEditProfile} isEditingInfo={isEditingInfo} marts={marts} delMart={delMart}
                handleNewInfo={handleNewInfo} addMart={addMart} addNewInfo={addNewInfo} addAward={addAward} awards={awards}
                delAward={delAward} showSave={showSave} changeGymData={changeGymData} />

        </div>
    )
}

export default Gprofile