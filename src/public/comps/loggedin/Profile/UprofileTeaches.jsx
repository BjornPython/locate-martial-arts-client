import React, { useEffect, useState } from 'react'
import { useMemo } from 'react'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import uuid from 'react-uuid'
const ShowTeaches = ({ art, showSpan, toggleTeachesArt }) => {

    const [span, setSpan] = useState(showSpan)

    const toggleSpan = () => {
        setSpan(!span)
    }



    return (

        <div className={`teaches-mart ${span ? "teaches-mart-active" : ""}`} onClick={() => { toggleSpan(); toggleTeachesArt(art) }}>
            <span >

            </span>
            <h4>{art}</h4>
        </div>
    )
}

function UprofileTeaches({ teaches, changeTeaches }) {
    const diffArts = ["Muay Thai", "Kickboxing", "Mixed Martial Arts", "Brazilian Jiu Jitsu",
        "Boxing", "Karate", "Wrestling", "Sambo"]

    const [selectedArts, setSelectedArts] = useState(teaches)
    const [showDropdown, setShowDropdown] = useState(false)
    const toggleTeachesArt = (art) => {
        if (selectedArts[art]) {
            setSelectedArts(prevArts => {
                const newArts = { ...prevArts }
                delete newArts[art]
                return newArts
            })
        } else {
            setSelectedArts(prevArts => {
                const newArts = { ...prevArts, [art]: true }
                return newArts
            })
        }
    }

    useEffect(() => {
        console.log("NEW SELECTED ARTS: ", selectedArts);
        if (Object.keys(teaches).length !== Object.keys(selectedArts).length)
            changeTeaches(selectedArts)
    }, [selectedArts])

    const toggleDropdown = () => {
        setShowDropdown(prevState => !prevState)
    }

    const teachesArtMemo = useMemo(() => {

        return (diffArts.map((mart) => {
            return (<ShowTeaches key={`teaches ${mart}`} art={mart} toggleTeachesArt={toggleTeachesArt}
                showSpan={selectedArts[mart] ? true : false} />)
        }))

    }, [selectedArts])




    return (
        <div className='u-profile-teaches'>

            <div className='teaches-dropdown-btn' onClick={toggleDropdown}>
                <h4>You Teach... </h4>
                <FontAwesomeIcon icon={faCaretDown} />
            </div>

            {showDropdown &&
                <div className='teaches-dropdown'>
                    {teachesArtMemo}
                </div>}

        </div>
    )
}

export default UprofileTeaches