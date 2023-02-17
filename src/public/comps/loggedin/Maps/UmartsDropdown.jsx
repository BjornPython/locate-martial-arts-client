import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useState, useMemo } from 'react'



const DropdownMart = ({ mart, toggleLookingForMart, setSpan }) => {
    const [showSpan, setShowSpan] = useState(setSpan)

    const toggleSpan = () => {
        setShowSpan(!showSpan)
    }

    const martMemo = useMemo(() => {
        return (
            <div className='u-marts-div' onClick={() => {
                toggleSpan();
                toggleLookingForMart(mart);
            }}>
                <span className={`u-lf-span ${showSpan && "u-lf-span-active"}`}></span>
                <h4>{mart}</h4>
            </div>
        )
    }, [showSpan])

    return (martMemo)
}

const DropDownMarts = ({ showDropdown, lookingForMarts, toggleLookingForMart }) => {
    const marts = ["Muay Thai", "Kickboxing", "Mixed Martial Arts", "Brazilian Jiu Jitsu",
        "Boxing", "Karate", "Wrestling", "Sambo"]



    if (showDropdown) {
        return (
            <div className='u-lf-marts-dropdown'>
                {marts.map((mart, index) => {
                    return (<DropdownMart key={index} mart={mart} toggleLookingForMart={toggleLookingForMart}
                        setSpan={lookingForMarts.includes(mart) ? true : false} />)
                })}
            </div>
        )
    }

}




function UmartsDropdown({ toggleLookingForMart, lookingForMarts }) {

    const [showDropdown, setShowDropdown] = useState(false)




    const toggleShowDropdown = () => {
        setShowDropdown(!showDropdown)
    }



    return (
        <div className='u-lf-marts-div'>
            <div className='u-lf-marts-box' onClick={toggleShowDropdown}>
                <h3>Selected Arts...</h3>
                <FontAwesomeIcon icon={faCaretDown} className="selected-arts-icon" />
            </div>

            <DropDownMarts showDropdown={showDropdown} toggleLookingForMart={toggleLookingForMart} lookingForMarts={lookingForMarts} />
        </div>

    )
}

export default UmartsDropdown