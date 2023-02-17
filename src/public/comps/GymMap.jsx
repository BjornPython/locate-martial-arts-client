import { useEffect, useRef, useMemo, useState } from 'react';
import L from "leaflet"
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup, useMap } from 'react-leaflet';

import "leaflet/dist/leaflet.css";
import "../css/gymMap.css"
import GetGyms from './GetGyms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsToDot, faEye } from '@fortawesome/free-solid-svg-icons';

const markerIcon = L.icon({
    iconUrl: require("../images/icons/place.png"),
    iconRetinaUrl: require("../images/icons/place.png"),
    iconSize: [42, 42]
})


// Component for getting the clicked position and setting the marker.
const GetCoordinates = ({ updateLatLong }) => {
    const map = useMap();

    useEffect(() => {
        if (!map) return;
        map.on('click', (e) => {
            map.setView(e.latlng, 18)
            updateLatLong(e.latlng.lat, e.latlng.lng)
        })
    }, [map])
    return null
}


// COmponent where the GymMap is, 
function GymMap({ latLong, updateLatLong, searchInfo }) {
    // a map ref for setting the view of the map.
    const mapRef = useRef(null)


    const [appHomeCurrentBounds, setAppHomeCurrentBounds] = useState(L.latLngBounds([null, null], [null, null]))


    useEffect(() => {
        console.log("CURRENT BOUNDS CHANGED")
        if (appHomeCurrentBounds.isValid() && mapRef) {
            console.log("FITTING BOUNDS")
            mapRef.current.fitBounds(appHomeCurrentBounds)
        }
    }, [appHomeCurrentBounds])

    useEffect(() => {
        if (!mapRef.current) { return }
        mapRef.current.setView([latLong[0], latLong[1]], 18)
    }, [latLong])


    // an event handler of the Marker. gets the latitude and the longitude
    // of the marker when it is dragged, and sets the latLong.
    const eventHandlers = useMemo(() => ({
        dragend(e) {
            const latlng = e.target.getLatLng()
            updateLatLong(parseFloat(latlng.lat), parseFloat(latlng.lng))
            mapRef.current.setView([parseFloat(latlng.lat), parseFloat(latlng.lng)], 18)
        },

    }))

    const recenterMap = () => {
        if (!mapRef) { return }
        console.log([latLong[0], latLong[1]])
        mapRef.current.setView([latLong[0], latLong[1]], 18)
    }

    const changeZoom = () => {
        let bounds = new L.LatLngBounds();
        mapRef.current.eachLayer((layer) => {
            if (layer instanceof L.FeatureGroup) {
                bounds.extend(layer.getBounds())
            }
        })

        if (bounds.isValid()) { setAppHomeCurrentBounds(bounds) } else { console.log("BOUNDS INVALID"); }
    }

    return (
        <div className="map" >
            <MapContainer ref={mapRef} center={latLong} zoom={18} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FeatureGroup >
                    <Marker eventHandlers={eventHandlers} position={latLong} draggable={true} icon={markerIcon}>
                        <Popup>
                            <h4>Your Position</h4> <br /> <p>lat: {latLong[0]} lng: {latLong[1]}</p>
                        </Popup>
                    </Marker>

                    <GetGyms searchInfo={searchInfo} changeZoom={changeZoom} />

                    <GetCoordinates updateLatLong={updateLatLong} />
                </FeatureGroup>



            </MapContainer>

            <button className='apphome-recenter-btn' onClick={(() => {
                recenterMap()
            })}><FontAwesomeIcon icon={faArrowsToDot} className="apphome-recenter-icn" /></button>
            <button className='apphome-eye-btn' onClick={() => { changeZoom() }} ><FontAwesomeIcon icon={faEye} className="apphome-recenter-icn" /></button>
        </div>

    )
}


export default GymMap