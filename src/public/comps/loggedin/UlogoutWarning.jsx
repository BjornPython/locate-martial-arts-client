import React from 'react'
import { useMemo } from 'react'
function UlogoutWarning({ showLogout, toggleShowLogout, CallLogoutUser }) {



    return (
        <>
            {showLogout &&
                <div className='logout-div'>
                    <h2>Confirm Logout?</h2>
                    <div className='logout-btns'>
                        <div className='logout-btn' onClick={CallLogoutUser}><h3>Logout</h3></div>
                        <div className='logout-btn' onClick={toggleShowLogout}><h3>Cancel</h3></div>
                    </div>
                </div>
            }
        </>

    )
}

export default UlogoutWarning