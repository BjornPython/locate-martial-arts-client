import Home from "../comps/Home"
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
// import AppHomeScript from "../scripts/AppHomeScript";





function AppHome() {

    // useEffect(() => {
    //     console.log("MAKING SCRIPT");
    //     const script = document.createElement('script');

    //     script.src = "../scripts/ApphomeScript.js";
    //     script.async = true;

    //     document.body.appendChild(script);

    //     return () => {
    //         document.body.removeChild(script);
    //     }
    // }, []);
    return (
        <div>
            <Home />
        </div>
    )
}

export default AppHome