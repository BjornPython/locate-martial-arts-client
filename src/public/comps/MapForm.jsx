import React, { useEffect } from 'react'
import { useState } from 'react'
import "../css/mapForm.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCaretDown, faLocation, faL } from '@fortawesome/free-solid-svg-icons'
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import uuid from 'react-uuid';
import Addresses from './Addresses'

function MapForm({ handleSearch, updateSearchInfo }) {


    //provider for the address input autocomplete.
    const provider = new OpenStreetMapProvider();

    // Latitude and Longitude Data used for centering the map and pinning.
    const [userLatLong, setUserLatLong] = useState({
        lat: null,
        long: null
    })
    const { lat, long } = userLatLong


    // The information the user is looking for. (gym/coach/spartner, martial arts) 
    const [searchData, setSearchData] = useState({
        lf: [],
        marts: [],
        other: ""
    })
    const { lf, marts, other } = searchData


    const [searchedAddress, setSearchedAddress] = useState({ address: "" })
    const { address } = searchedAddress



    const changeSearchedAddress = (e) => {
        console.log("CURRENT ADDRESS: ", address);

        setSearchedAddress((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const [addressResults, setAddressResults] = useState([])

    // Will pin the marker on the first result from the autocomplete when address is submitted.
    const onSearchAddress = (e) => {
        e.preventDefault()
        if (address !== "") {
            setUserLatLong({ lat: addressResults[0].y, long: addressResults[0].x })
            setShowSuggestions(false)

        } else {
            console.log("no");
        }
    }

    // Adds the user's selected queries (GYM / COACH / SPARTNER)
    const addLf = (lf) => {
        console.log(`${lf} clicked`);

        if (searchData.lf.includes(lf)) {
            let newSearchData = searchData
            const i = newSearchData.lf.indexOf(lf)
            newSearchData.lf.splice(i, 1)
            setSearchData(newSearchData)
            console.log(searchData);
        } else {
            let newSearchData = searchData
            newSearchData.lf.push(lf)
            setSearchData(newSearchData)
            console.log(searchData);
        }
    }


    // Adds the user's selected art in the dropdown.
    const addArt = (art) => {
        console.log(`${art} clicked`);

        if (searchData.marts.includes(art)) {
            let newSearchData = searchData
            const i = newSearchData.marts.indexOf(art)
            newSearchData.marts.splice(i, 1)
            setSearchData(newSearchData)
            console.log(searchData);
        } else {
            let newSearchData = searchData
            newSearchData.marts.push(art)
            setSearchData(newSearchData)
            console.log(searchData);
        }

    }

    // Function and Callbacks for requesting and getting the user's location.
    const successCallback = async (success) => {
        console.log(success);
        console.log("LATLONG: ", success.coords.latitude, success.coords.longitude)
        console.log("CHANGING LATLONGFORMDATA...");
        setUserLatLong({ lat: success.coords.latitude, long: success.coords.longitude })
    }
    const errorCallback = (error) => {
        console.log(error);
    }
    const getLocation = (e) => {
        e.preventDefault()
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
    }

    // Called when an address is clicked. 
    const handleAddressClick = (x, y) => {
        console.log("HANDLING ADDRESS CLICK");
        setUserLatLong({ lat: y, long: x })
        setShowSuggestions(false)
    }

    // Shows the suggested adresses if True, hides it if False.
    const [showSuggestions, setShowSuggestions] = useState(false)



    // Triggered when latLongFormData is changed. calls the 
    // handleSearch function to pin and center the map.
    useEffect(() => {
        if (!lat || !long) { return }
        console.log("LATLONG FORMDATA: ", userLatLong);
        handleSearch(lat, long)
    }, [userLatLong])



    const [timeoutId, setTimeoutId] = useState(null);

    // Triggered everytime the address input changes. 
    // Calls the provider.search to get the address results.
    useEffect(() => {
        const fetchAddresses = async () => {

            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            setTimeoutId(setTimeout(async () => {
                console.log("CALLING PROVIDER.SEARCH()");
                const res = await provider.search({ query: address })

                // do something after .3 seconds of no state changes
                if (address === "") {
                    setAddressResults([])
                    setShowSuggestions(false)
                }
                else {
                    console.log("RESPONSE: ", res);
                    setShowSuggestions(true)
                    setAddressResults(res)
                }
            }, 300));


        }
        fetchAddresses()
    }, [address])




    return (
        <div className='map-form'>
            <div className='address-div'>

                <form action="" className="address-form">
                    <button className='loc-btn' onClick={getLocation}><FontAwesomeIcon icon={faLocation} className="loc-fnt" /></button>

                    <input className="address font" type="text" name="address" value={address} placeholder="Search Your Area" onChange={changeSearchedAddress} autoComplete="off" />

                    <button onClick={onSearchAddress} className="address-btn"><FontAwesomeIcon icon={faSearch} className="search-fnt" />
                    </button>
                </form>

                <h1>FIND A? </h1>

                <p>(what are you looking for?)</p>

                <div className='find-btns'>
                    <button className='find-btn' onClick={() => { addLf("gym") }}> <span className='find-btn-span'></span> <h3>GYM</h3></button>
                    <button className='find-btn' onClick={() => { addLf("coach") }}> <span className='find-btn-span'></span> <h3>COACH</h3></button>
                    <button className='find-btn' onClick={() => { addLf("spartner") }}> <span className='find-btn-span'></span> <h3>SPARTNER</h3></button>
                </div>

                <h1>WHAT MARTIAL ART? </h1>

                <div className='select-m-arts'>
                    <h3>Select Martial Arts...</h3>
                    <FontAwesomeIcon icon={faCaretDown} className="dd-icon" />
                    <span className='select-span'></span>
                </div>

                <button onClick={() => { updateSearchInfo({ location: [lat, long], lf, marts, other }); console.log("CLICK"); }} className="find-gyms-btn"><h2>SEARCH</h2></button>

                <div className='marts-dropdown'>
                    <div className='m-art' onClick={() => { addArt("Muay Thai") }}>
                        <span className='m-art-span'></span>
                        <h3>Muay Thai</h3>
                    </div>
                    <div className='m-art' onClick={() => { addArt("Kickboxing") }}>
                        <span className='m-art-span'></span>
                        <h3>Kickboxing</h3>
                    </div>
                    <div className='m-art' onClick={() => { addArt("Mixed Martial Arts") }}>
                        <span className='m-art-span'></span>
                        <h3>Mixed Martial Arts</h3>
                    </div>
                    <div className='m-art' onClick={() => { addArt("Brazilian Jiu Jitsu") }}>
                        <span className='m-art-span'></span>
                        <h3>Brazilian Jiu Jitsu</h3>
                    </div>
                    <div className='m-art' onClick={() => { addArt("Boxing") }}>
                        <span className='m-art-span'></span>
                        <h3>Boxing</h3>
                    </div>
                    <div className='m-art' onClick={() => { addArt("Karate") }}>
                        <span className='m-art-span'></span>
                        <h3>Karate</h3>
                    </div>
                    <div className='m-art' onClick={() => { addArt("Wrestling") }}>
                        <span className='m-art-span'></span>
                        <h3>Wrestling</h3>
                    </div>
                    <div className='m-art' onClick={() => { addArt("Sambo") }}>
                        <span className='m-art-span'></span>
                        <h3>Sambo</h3>
                    </div>

                    {/* <input className="others font" type="text" name="other" value={other} placeholder="Other..." onChange={changeAddressData} /> */}
                </div>

                {/* // Shows the suggested adresses if True, hides it if False. */}
                {showSuggestions &&
                    <div className='search-results'>
                        {addressResults.slice(0, 5).map((address) => {
                            return (<Addresses key={uuid()} x={address.x} y={address.y} label={address.label} handleAddressClick={handleAddressClick} />)
                        })}
                    </div>
                }

            </div>
        </div >
    )
}

export default MapForm