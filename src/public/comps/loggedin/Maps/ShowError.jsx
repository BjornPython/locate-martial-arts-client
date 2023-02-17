import React from 'react'

function ShowError({ showError, error }) {

    return (
        <div className={`display-error ${showError && "display-error-active"}`}>
            <h3>{error}</h3>
        </div>
    )


}

export default ShowError