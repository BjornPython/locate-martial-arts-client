import React, { useEffect, useMemo } from 'react'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import "../../../css/loggedin/uprofile.css"
import apiService from '../../../../features/apis/apiService'


import UprofileBox from "./UprofileBox"
import UprofileStatus from './UprofileStatus';
import UprofileFinding from './UprofileFinding'
import UprofileContents from './UprofileContents'


function Uprofile({ user, info }) {


    // true if user is editing profile.
    const [isEditingInfo, setIsEditingInfo] = useState(false)
    // Used for adding martial arts and awards/Achievements
    const [newInfo, setNewInfo] = useState({
        addMart: "",
        addAward: ""
    })
    const { addMart, addAward } = newInfo

    // has the initial value of userInfo. information here will be displayed in the
    // user's profile. 
    const [dbUserInfo, setDbUserInfo] = useState(null)



    const [newUserInfo, setNewUserInfo] = useState({
        name: "",
        bio: "",
        coach: true,
        location: {},
        lfSpar: false,
        lfSparArts: {},
        lfCoach: false,
        lfCoachArts: {},
        marts: {},
        awards: [],
        lfDataChanged: 0,
        teaches: {},
        initialValues: true
    })

    const { name, bio, coach, lfSparArts, lfCoachArts, marts, awards, lfDataChanged, teaches } = newUserInfo
    const [showSave, setShowSave] = useState(false)

    useEffect(() => {
        console.log("TEACHES IN UPROFILE: ", teaches);
    }, [teaches])

    // Calls the getUserInfo function to get and set the user's information. also sets the 
    // setDisplayInfo to true so the profile will display the information.
    useEffect(() => {
        if (info === null) { return }
        else {
            console.log("INFO: ", info);
            setNewUserInfo({ ...info, lfDataChanged: 0 });
            // had to stringiny then parse so the two states will not have the same reference.
            setDbUserInfo(JSON.parse(JSON.stringify(info)));
        }
    }, [info])

    useEffect(() => {
        if (name === "" || newUserInfo.initialValues) { return }
        console.log("NAME CHANGED");
        changeUserData()
    }, [name, bio])

    // Used for updating database when lfSparArts or lfCoachArts changes
    useEffect(() => {
        if (lfDataChanged === 0) { return }
        console.log("LFDATA CHANGED: ", lfDataChanged);
        changeUserData()
    }, [lfDataChanged])

    useEffect(() => {

    }, [teaches])


    // Used to update LfSpartner and calls the changeUserData() which updates the database.
    const updateLfSpartner = (mart) => {
        if (Object.keys(lfSparArts).includes(mart)) {
            // remove
            setNewUserInfo((prevState) => {
                const newState = { ...prevState }
                newState.lfDataChanged += 1
                delete newState.lfSparArts[mart]
                newState.lfSpar = Object.keys(lfSparArts).length > 0 ? true : false
                return newState
            })
        } else {
            setNewUserInfo((prevState) => {
                const newState = { ...prevState };
                newState.lfDataChanged += 1
                newState.lfSparArts[mart] = true
                newState.lfSpar = Object.keys(lfSparArts).length > 0 ? true : false
                return newState
            })
        }
        // add
    }
    // Used to update lfCoachArts and calls the changeUserData() which updates the database.
    const updateLfCoach = (mart) => {
        if (Object.keys(lfCoachArts).includes(mart)) {
            // remove
            setNewUserInfo((prevState) => {
                const newState = { ...prevState }
                delete newState.lfCoachArts[mart]
                newState.lfCoach = Object.keys(lfCoachArts).length > 0 ? true : false
                newState.lfDataChanged += 1
                return newState
            })
        } else {
            setNewUserInfo((prevState) => {
                const newState = { ...prevState };
                newState.lfCoachArts[mart] = true
                newState.lfCoach = Object.keys(lfCoachArts).length > 0 ? true : false
                newState.lfDataChanged += 1
                return newState
            })
        }
    }
    //****************************************************************************************************************************** */

    // Used for the forms when user is adding their martial arts or awards.
    const handleNewInfo = ((e) => {
        setNewInfo((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    })

    // Function used to update the user's database.
    const changeUserData = async () => {
        const response = await apiService.updateUserInfo(user, newUserInfo);
        if (isEditingInfo) { setIsEditingInfo(false) }
        { showSave && setShowSave(false) }
    }


    // Deletes a martial art in newUserInfo
    const delMart = (mart) => {
        setNewUserInfo((prevState) => {
            const newState = { ...prevState };
            delete newState.marts[`${mart}`]
            return newState
        })

    }
    // Deletes an award in newUserInfo
    const delAward = (award) => {
        setNewUserInfo((prevState) => {
            const newState = { ...prevState };
            newState.awards = newState.awards.filter((item) => item !== award);
            return newState
        })
    }

    // Adds a new info in newUserInfo
    const addNewInfo = (info, type = null) => {
        if (type) {
            setNewUserInfo((prevState) => {
                const newState = { ...prevState };
                newState.marts = {
                    ...newState.marts,
                    [info]: true
                }
                return newState
            })
        } else {
            const newAwards = { ...newUserInfo }
            newAwards.awards.push(info)
            setNewUserInfo(newAwards)
        }
    }

    // Used to update user's status to coach/student
    const changeUserStatus = (makeCoach) => {
        if (isEditingInfo) {
            if (makeCoach === 1 && coach === false) {
                setNewUserInfo((prevState) => {
                    const newState = { ...prevState, coach: true };
                    return newState
                })
            }
            else if (makeCoach !== 1 && coach === true) {
                setNewUserInfo((prevState) => {
                    const newState = { ...prevState, coach: false }
                    return newState
                })
            }
        }
    }

    const handleEditProfile = () => {
        if (!isEditingInfo) {
            setIsEditingInfo(!isEditingInfo)
            setShowSave(!showSave)
        } else {
            setIsEditingInfo(!isEditingInfo)
            setShowSave(!showSave)
            setNewUserInfo(JSON.parse(JSON.stringify({ ...dbUserInfo, lfDataChanged: 0 })))
        }
    }

    // Used to update user's name and bio.
    const changeNameBio = async (newName, newBio) => {
        setNewUserInfo((prevState) => {
            const newState = { ...prevState, name: newName, bio: newBio };
            return newState
        })
    }

    const changeTeaches = (newTeaches) => {
        console.log("CHANGING TEACHES: ");
        setNewUserInfo(prevState => {
            const newState = { ...prevState, teaches: { ...newTeaches } }
            return newState
        })
    }



    return (
        <div id='u-profile-page' className='u-profile-page'>
            <UprofileBox name={name} bio={bio} faGear={faGear} changeNameBio={changeNameBio} changeUserData={changeUserData} />
            <UprofileFinding lfSparArts={lfSparArts} lfCoachArts={lfCoachArts} lfDataChanged={lfDataChanged}
                updateLfSpartner={updateLfSpartner} updateLfCoach={updateLfCoach} />
            <UprofileContents
                isEditingInfo={isEditingInfo} handleEditProfile={handleEditProfile} showSave={showSave}
                marts={marts} awards={awards} addMart={addMart} delMart={delMart} delAward={delAward} addAward={addAward}
                handleNewInfo={handleNewInfo} addNewInfo={addNewInfo} UprofileStatus={UprofileStatus} coach={coach}
                changeUserStatus={changeUserStatus} changeUserData={changeUserData} teaches={teaches} changeTeaches={changeTeaches} />
        </div>

    )
}



export default Uprofile