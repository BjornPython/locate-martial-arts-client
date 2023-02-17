import React, { useEffect } from 'react'
import "../../css/loggedin/unav.css"
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fa } from "@fortawesome/free-brands-svg-icons"

import { faSearch, faUser, faMessage, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const IconsComp = ({ icon, page, callChangePage, currentPage }) => {

    const [showSpan, setShowSpan] = useState(currentPage === page ? true : false)

    const handleIconClick = () => {
        if (currentPage === page) { return }
        else { setShowSpan(!showSpan) }
    }

    useEffect(() => {
        if (currentPage !== page) { setShowSpan(false) }
        else { setShowSpan(true) }

    }, [currentPage])


    return (
        <div className="u-n-icon profile-btn" onClick={() => { callChangePage(page); handleIconClick() }}>
            <span className={`profile-btn-span ${showSpan && "profile-btn-span-active"}`}></span>
            <FontAwesomeIcon icon={icon} className={`nav-icns ${showSpan && "nav-icns-active"}`} />
        </div>
    )

}



function Unav({ changePage, currentPage, toggleShowLogout }) {

    const callChangePage = (page) => {
        changePage(page)
    }



    return (
        <div className='u-navbar'>
            <div className="u-n-icon sign-out-btn" onClick={toggleShowLogout}> <FontAwesomeIcon className='' icon={faSignOutAlt} /></div>

            <div className="u-navbar-icons">
                <IconsComp icon={faSearch} page="search" callChangePage={callChangePage} currentPage={currentPage} />
                <IconsComp icon={faUser} page="profile" callChangePage={callChangePage} currentPage={currentPage} />
                <IconsComp icon={faMessage} page="messages" callChangePage={callChangePage} currentPage={currentPage} />
            </div>



        </div >
    )
}

export default Unav