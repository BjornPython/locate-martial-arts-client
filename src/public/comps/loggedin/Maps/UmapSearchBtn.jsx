import React from 'react'

function UmapSearchBtn({ getMarkerLocations }) {
    return (
        <div className='u-search-btn-div' onClick={getMarkerLocations}>
            <h2>Search</h2>
        </div>
    )
}

export default UmapSearchBtn