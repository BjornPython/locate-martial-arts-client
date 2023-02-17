import React, { useEffect, useState } from 'react'
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import "../../../css/loggedin/Umaps/UmapForms.css"
import { faLocation, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UsearchResults from './UsearchResults';
import ShowError from './ShowError';
import UlookingFor from './UlookingFor';
import UmartsDropdown from './UmartsDropdown';
import UmapSearchBtn from './UmapSearchBtn';

function UmapForms({ updateUserInfo, selectedLfs, toggleLf, lookingForMarts, toggleLookingForMart, getMarkerLocations }) {
    const provider = new OpenStreetMapProvider();

    const [searchedAddress, setSearchedAddress] = useState({
        searchQuery: ""
    })
    const { searchQuery } = searchedAddress

    const [searchResults, setSearchResults] = useState([])

    const [showSearchResults, setShowSearchResults] = useState(false)

    const [timeoutId, setTimeoutId] = useState(null);

    const [showError, setShowError] = useState({ show: false, errorMessage: "" })



    useEffect(() => {
        if (searchResults.length > 1) {
            setShowSearchResults(true)
        } else {
            setShowSearchResults(false)
        }
    }, [searchResults])

    useEffect(() => {
        const fetchAddresses = async () => {

            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            setTimeoutId(setTimeout(async () => {
                const res = await provider.search({ query: searchQuery })
                // do something after .3 seconds of no state changes
                if (searchQuery === "") {
                    setSearchResults([])
                }
                else {
                    const addresses = res.slice(0, 5).map((address) => {
                        return ({ label: address.label, lat: address.raw.lat, long: address.raw.lon })
                    })
                    setSearchResults(addresses)
                }
            }, 300));


        }
        fetchAddresses()
    }, [searchQuery])

    const hideError = () => {
        setTimeout(() => {
            setShowError({ show: false, message: "" })
        }, 3000);
    }


    const changeSearchedAddress = (e) => {
        setSearchedAddress((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const getUserLocation = (e) => {
        e.preventDefault()
        navigator.geolocation.getCurrentPosition((res) => {
            console.log("SUCCESS: ", res);
            updateUserInfo(res.coords.latitude, res.coords.longitude)
        }, (error) => {
            console.log("ERROR: ", error);
            setShowError({ show: true, errorMessage: error.message })
            hideError()
        })

    }

    const searchAddress = (e) => {
        e.preventDefault()
        updateUserInfo(searchResults[0].lat, searchResults[0].long)
        hideSearchResults()
    }

    const hideSearchResults = () => {
        if (showSearchResults) { setShowSearchResults(false) }
    }


    return (
        <>
            <div className='u-map-css'>
                <ShowError showError={showError.show} error={showError.errorMessage} />

                <form className='address-forms' >
                    <button onClick={getUserLocation} className="u-loc-btn"><FontAwesomeIcon className='u-loc-icon' icon={faLocation} /></button>
                    <input className='u-address-input' type="text" name='searchQuery' value={searchQuery} onChange={changeSearchedAddress} placeholder="Search Your Area's Address" />
                    <button onClick={searchAddress} ><FontAwesomeIcon className='u-search-icon' icon={faSearch} /></button>
                </form>

                <hr className='u-map-form-hr' />

                <UlookingFor selectedLfs={selectedLfs} toggleLf={toggleLf} />
                <UmartsDropdown toggleLookingForMart={toggleLookingForMart} lookingForMarts={lookingForMarts} />
                <UsearchResults showSearchResults={showSearchResults} searchResults={searchResults} updateUserInfo={updateUserInfo} hideSearchResults={hideSearchResults} />
                <UmapSearchBtn getMarkerLocations={getMarkerLocations} />
            </div>

        </>
    )
}

export default UmapForms