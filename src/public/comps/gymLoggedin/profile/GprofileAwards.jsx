import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons"

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


function GprofileAwards({ isEditingInfo, awards, handleNewInfo, addNewInfo, delAward, addAward }) {
    console.log("ADDAWARD: ", addAward);
    return (
        <div className='u-profile-marts'>
            <h3>ACHIEVEMENTS</h3>
            <div className='u-profile-grp'>
                <div className='profile-marts-box'>
                    {!isEditingInfo
                        ? awards.map((award, val) => {
                            const id = `GprofileAwards ${award}`
                            return showInfo(award, id)
                        })
                        : awards.map((award, val) => {
                            const id = `GprofileAwards ${award}`
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

export default GprofileAwards