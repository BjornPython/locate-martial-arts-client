import React, { useState } from 'react'
import { useEffect } from 'react';
import { useMap, useMapEvent } from 'react-leaflet';
import L from "leaflet"
import { Marker, Popup } from 'react-leaflet';
import "../../../css/loggedin/Umaps/UhelperComponent.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

const GymMarkerIcon = L.icon({
    iconUrl: require("../../../images/icons/punching-bag.png"),
    iconRetinaUrl: require("../../../images/icons/punching-bag.png"),
    iconSize: [42, 42]

})

const CoachMarkerIcon = L.icon({
    iconUrl: require("../../../images/icons/coach.png"),
    iconRetinaUrl: require("../../../images/icons/coach.png"),
    iconSize: [42, 42]

})

const StudentMarkerIcon = L.icon({
    iconUrl: require("../../../images/icons/student.png"),
    iconRetinaUrl: require("../../../images/icons/student.png"),
    iconSize: [42, 42]

})






const MoveMarkerOnClick = ({ updateUserInfo }) => {
    const map = useMap()

    useEffect(() => {
        map.on("click", (e) => {
            updateUserInfo(e.latlng.lat, e.latlng.lng)
        })
    }, [])
}

const ShowMarkers = ({ data, markerIcon, type, callCreateConvo }) => {
    return data.map((marker) => {
        return (
            <Marker
                key={marker._id}
                position={[marker.location.lat, marker.location.long]}
                icon={markerIcon}
            >
                {type !== "gyms"
                    ?
                    <Popup minWidth={200}>
                        <div className='marker-popup-div'>
                            <div className='marker-popup-name-msg'>
                                <div className='marker-pop-up-name'>
                                    <h2>{marker.name}</h2>
                                    <h4 className='popup-bio'>{marker.coach ? "COACH" : "STUDENT"}</h4>
                                </div>

                                <FontAwesomeIcon icon={faMessage} className="popup-msg-icn" onClick={() => { callCreateConvo(marker.name, marker._id) }} />
                            </div>


                            {marker.teaches &&
                                <div className='popup-info-div'>
                                    <span className='popup-info-span' />
                                    <h4>finding spartner in: </h4>
                                    <div className='popup-ul'>
                                        {Object.keys(marker.lfSparArts).map((art, index) => { return <h4 key={index}>● {art}</h4> })}
                                    </div>
                                </div>}

                            {marker.coach &&
                                <div className='popup-info-div'>
                                    <span className='popup-info-span' />
                                    <h4>coaches: </h4>
                                    <div className='popup-ul'>
                                        {Object.keys(marker.teaches).map((art, index) => { return <h4 key={index}>● {art}</h4> })}
                                    </div>
                                </div>}

                        </div>
                    </Popup>
                    :
                    <Popup>
                        <div className='marker-popup-div'>
                            <div className='marker-popup-name-msg'>
                                <div className='marker-pop-up-name'>
                                    <h2>{marker.name}</h2>
                                    <h4 className='popup-bio'>{marker.bio ? marker.bio : "Be fit be healthy"}</h4>
                                </div>

                                <FontAwesomeIcon icon={faMessage} className="popup-msg-icn" onClick={() => { callCreateConvo(marker.name, marker._id) }} />
                            </div>

                            {marker.marts &&
                                <div className='popup-info-div'>
                                    <span className='popup-info-span' />
                                    <h4>martial arts: </h4>
                                    <div className='popup-ul'>
                                        {Object.keys(marker.marts).map((art, index) => { return <h4 key={index}>● {art}</h4> })}
                                    </div>
                                </div>}


                        </div></Popup>
                }
            </Marker>
        )
    })
}









function HelperComponent({ userInfo, updateUserInfo, markerPoints, createConvo, changeZoom }) {
    const { lat, long, name, id } = userInfo
    const { gyms, coaches, spartners } = markerPoints

    useEffect(() => {
        changeZoom()
    }, [gyms, coaches, spartners])

    const callCreateConvo = (participantTwo, participantTwoId) => {
        createConvo(name, id, participantTwo, participantTwoId)
    }

    return (
        <>
            <MoveMarkerOnClick updateUserInfo={updateUserInfo} />
            <ShowMarkers data={gyms} markerIcon={GymMarkerIcon} type="gyms" callCreateConvo={callCreateConvo} />
            <ShowMarkers data={coaches} markerIcon={CoachMarkerIcon} type="coaches" callCreateConvo={callCreateConvo} />
            <ShowMarkers data={spartners} markerIcon={StudentMarkerIcon} type="spartners" callCreateConvo={callCreateConvo} />
        </>
    )
}

export default HelperComponent