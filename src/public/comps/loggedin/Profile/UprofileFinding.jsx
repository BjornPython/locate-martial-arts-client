import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMemo, useState } from 'react'
import uuid from 'react-uuid'
import { useEffect } from 'react'
import UdisplayMart from './UdisplayMart'



function UprofileFinding({ lfSparArts, lfCoachArts, updateLfSpartner, updateLfCoach, lfDataChanged }) {

    const [darkenSpar, setDarkenSpar] = useState(false)
    const [darkenCoach, setDarkenCoach] = useState(false)

    const [showSpar, setShowSpar] = useState(false)
    const [showCoach, setShowCoach] = useState(false)

    const diffArts = ["Muay Thai", "Kickboxing", "Mixed Martial Arts", "Brazilian Jiu Jitsu",
        "Boxing", "Karate", "Wrestling", "Sambo"]

    const lfSparArtsMemo = useMemo(() => {
        return diffArts.map(mart => {
            return <UdisplayMart key={uuid()} mart={mart}
                setFunction={updateLfSpartner}
                setSpan={Object.keys(lfSparArts).includes(mart) ? true : false} />
        })
    }, [lfSparArts])

    const lfCoachArtsMemo = useMemo(() => {
        return diffArts.map(mart => {
            return <UdisplayMart key={uuid()} mart={mart}
                setFunction={updateLfCoach}
                setSpan={Object.keys(lfCoachArts).includes(mart) ? true : false} />
        })
    }, [lfCoachArts])



    useEffect(() => {
        if (Object.keys(lfSparArts).length > 0) {
            setDarkenSpar(true)
        } else { setDarkenSpar(false) }
    }, [lfSparArts, lfDataChanged])

    useEffect(() => {
        if (Object.keys(lfCoachArts).length > 0) {
            setDarkenCoach(true)
        } else { setDarkenCoach(false) }
    }, [lfCoachArts, lfDataChanged])


    return (
        <div className="looking-for">
            <div className="u-for">
                <h4 className='u-for-h' style={{ color: `${darkenSpar ? "white" : "gray"}` }}>Looking for a Sparring Partner:</h4>
                <div className='dropdowns-div' >
                    <div id='spartner-div' className={`looking-for-dropdown ${darkenSpar ? "looking-for-dropdown-has" : null}`}
                        onClick={() => { setShowSpar(!showSpar) }}>
                        <h4>Sparring partner in...</h4>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </div>

                    <div id="spartner-dropdown"
                        className={`spar-dropdown ${darkenSpar ? "spar-dropdown-has" : ""} ${showSpar ? "spar-dropdown-active" : ""}`}>
                        {lfSparArtsMemo}
                    </div>
                </div>

            </div>

            <div className="u-for">
                <h4 className='u-for-h' style={{ color: `${darkenCoach ? "white" : "gray"}` }}>Looking for a Coach:</h4>
                <div className='dropdowns-div' >
                    <div id="coach-div" className={`looking-for-dropdown ${darkenCoach ? "looking-for-dropdown-has" : null}`}
                        onClick={() => { setShowCoach(!showCoach) }}>
                        <h4>Coach in...</h4>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </div>
                    <div id="coach-dropdown" className={`spar-dropdown ${darkenCoach ? "spar-dropdown-has" : null} ${showCoach ? "spar-dropdown-active" : ""}`}>
                        {lfCoachArtsMemo}

                    </div>
                </div>

            </div>

        </div>
    )
}

export default UprofileFinding