import { useState } from "react";
import uuid from "react-uuid";

function UdisplayMart({ mart, setFunction, setSpan = false }) {

    const [showSpan, setShowSpan] = useState(setSpan)

    const handleClick = () => {
        console.log(`${mart} clicked!`);
        setFunction(mart)
        setShowSpan(!showSpan)
    }
    // setFunction(mart);
    return (
        <div className='u-display-mart' onClick={() => { handleClick(); }}>
            <span className={`u-mart-span ${showSpan && "u-mart-span-active"}`}></span>
            <h4>{mart}</h4>
        </div>
    )
}

export default UdisplayMart