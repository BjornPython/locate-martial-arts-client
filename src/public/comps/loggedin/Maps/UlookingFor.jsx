import { useState, useEffect } from "react"

const LookingFors = ({ value, toggleLf }) => {
    const [showSpan, setShowSpan] = useState(false)

    const toggleSpan = () => {
        setShowSpan(!showSpan)
    }

    return (
        <div className='u-lf-div' onClick={() => { toggleLf(value); toggleSpan(); }} >
            <span className={`u-lf-span ${showSpan && "u-lf-span-active"}`}></span>
            <h4 className='u-lf-btn'>{value}</h4>
        </div>

    )
}


function UlookingFor({ toggleLf }) {



    return (
        <div className='u-lf-for'>
            <LookingFors value={"GYM"} toggleLf={toggleLf} />
            <LookingFors value={"COACH"} toggleLf={toggleLf} />
            <LookingFors value={"SPARTNER"} toggleLf={toggleLf} />
        </div>
    )
}

export default UlookingFor