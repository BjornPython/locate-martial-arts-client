import React from 'react'
import "../css/authWarning.css"
function AuthWarning({ errorMsg }) {
    return (

        <div className='auth-warning'>
            <h4>{errorMsg}</h4>
        </div>
    )
}

export default AuthWarning