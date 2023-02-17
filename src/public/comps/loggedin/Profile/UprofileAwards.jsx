import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import uuid from 'react-uuid'
import { useEffect } from 'react'
const showInfo = (mart, id) => {
    return (
        <div key={id} className='edit-info'>
            <h4 >● {mart}</h4>
        </div>)
}


// Show Editable Art
const editArt = (award, id, delAward) => {
    return (
        <div key={id} className='edit-info'>
            <h4 >● {award}</h4>
            <FontAwesomeIcon icon={faXmark} className="u-delete-font" onClick={() => { delAward(award) }} />
        </div>
    )
}


function UprofileAwards({ isEditingInfo, awards, delAward, addAward, handleNewInfo, addNewInfo }) {


    return (
        <div className='u-profile-marts'>
            <h3>ACHIEVEMENTS</h3>
            <div className='u-profile-grp'>
                <div className='profile-marts-box'>
                    {!isEditingInfo
                        ? awards.map((award, val) => {
                            const id = `UprofileAwards ${award}`
                            return showInfo(award, id)
                        })
                        : awards.map((award, val) => {
                            const id = `UprofileAwards ${award}`
                            return editArt(award, id, delAward)
                        })}
                    {isEditingInfo &&
                        <div className='add-info'>
                            <input type="text" value={addAward} name="addAward" onChange={handleNewInfo} />
                            <FontAwesomeIcon icon={faPlus} className="add-info-icon" onClick={() => { addNewInfo(addAward) }} />
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default UprofileAwards