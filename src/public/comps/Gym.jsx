import "../css/gym.css"
import GymMap from "./GymMap"
import { useEffect, useState } from "react"
import MapForm from "./MapForm"

function Gym() {

    const [latLong, setLatLong] = useState([14.59637514, 120.9782618])

    const [searchInfo, setSearchInfo] = useState(null)

    useEffect(() => {
        console.log("latlong changed: ", latLong)
    }, [])

    const handleSearch = (lat, long) => {
        setLatLong([lat, long])
    }

    const handleAddressSearch = (address, lf, art) => {
        console.log("IN GYM: ", address, lf, art);
    }

    const updateLatLong = (lat, long) => {
        setLatLong([lat, long])
    }

    const updateSearchInfo = (newSearchInfo) => {
        setSearchInfo(newSearchInfo)
    }


    return (
        <div className="gym-page">
            <div className="gym-components">

                <MapForm handleSearch={handleSearch} handleAddressSearch={handleAddressSearch} updateSearchInfo={updateSearchInfo} />

                <div className="gym-map">
                    <div className="map-bg">
                        <GymMap latLong={latLong} updateLatLong={updateLatLong} searchInfo={searchInfo} />

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Gym