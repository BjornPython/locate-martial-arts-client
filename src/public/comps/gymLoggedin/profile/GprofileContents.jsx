import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import GprofileMarts from './GprofileMarts';
import GprofileAwards from './GprofileAwards';


const showPSpan = (txt) => {
    return (<><p>{txt}</p><span /></>)
}

function GprofileContents({
    handleEditProfile, isEditingInfo, marts, awards, delMart, addNewInfo,
    handleNewInfo, addMart, addAward, delAward, showSave, changeGymData
}) {
    return (
        <div className="u-profile-contents">
            <FontAwesomeIcon icon={faGear} className="p-setting-icon" onClick={() => { handleEditProfile(); }} />
            <GprofileMarts isEditingInfo={isEditingInfo} marts={marts} delMart={delMart}
                handleNewInfo={handleNewInfo} addMart={addMart} addNewInfo={addNewInfo} />
            {showPSpan("People can see the martial arts your gym offers when they click your icon on the map.")}

            <GprofileAwards isEditingInfo={isEditingInfo} awards={awards} addNewInfo={addNewInfo} addAward={addAward}
                handleNewInfo={handleNewInfo} delAward={delAward} />
            {showPSpan("People can see your gym's awards when they click your icon on the map.")}

            <div className='u-profile-marts'>
                <h3>YOUR AREA</h3>
                <div className='u-profile-grp'>
                    <h4 className='user-loc'>Cainta Greenpark, Cainta Rizal</h4>
                </div>
            </div>
            {showPSpan("Help people near you connect with you. Pin your area on the maps to set.")}

            <div className='save-changes'>
                {console.log("SHOWSAVE? ", showSave)}
                {showSave
                    ? (
                        <button onClick={changeGymData}>Save Changes</button>
                    )
                    : null}
            </div>
        </div>
    )
}

export default GprofileContents