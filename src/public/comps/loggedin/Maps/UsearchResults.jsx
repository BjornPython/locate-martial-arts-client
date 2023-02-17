import React from 'react'

const ShowResult = ({ result, updateUserInfo, hideSearchResults }) => {

    return (
        <h3 onClick={() => {
            updateUserInfo(result.lat, result.long); hideSearchResults()
        }}>
            {result.label}
        </h3>
    )
}


function UsearchResults({ showSearchResults, searchResults, updateUserInfo, hideSearchResults }) {


    if (showSearchResults) {
        return (
            <div className='u-searchres-div'>
                {searchResults.map((result, index) => {
                    return (
                        <ShowResult key={index} result={result} updateUserInfo={updateUserInfo} hideSearchResults={hideSearchResults}></ShowResult>
                    )
                })}
            </div >
        )
    } else {
        return (
            <>
            </>
        )
    }


}

export default UsearchResults