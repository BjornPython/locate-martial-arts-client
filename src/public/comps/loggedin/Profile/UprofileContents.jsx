import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import UprofileMarts from './UprofileMarts'
import UprofileAwards from './UprofileAwards'
import UprofileTeaches from './UprofileTeaches'
const showPSpan = (txt) => {
    return (<><p>{txt}</p><span /></>)
}


function UprofileContents(
    {
        isEditingInfo, handleEditProfile, showSave,
        marts, awards, addMart, delMart, delAward, addAward,
        handleNewInfo, addNewInfo, UprofileStatus, coach, changeUserStatus,
        changeUserData, teaches, changeTeaches
    }
) {
    return (
        <div className="u-profile-contents">
            <FontAwesomeIcon icon={faGear} className="p-setting-icon" onClick={() => { handleEditProfile(); }} />
            <UprofileMarts isEditingInfo={isEditingInfo} marts={marts} addMart={addMart} delMart={delMart} handleNewInfo={handleNewInfo} addNewInfo={addNewInfo} />
            {showPSpan("People can see your martial arts when they check your profile.")}
            <UprofileAwards isEditingInfo={isEditingInfo} awards={awards} delMart={delMart} delAward={delAward} addAward={addAward} handleNewInfo={handleNewInfo} addNewInfo={addNewInfo} />
            {showPSpan("People can see your martial arts when they check your profile.")}
            <div className='u-profile-marts'>
                <h3>YOUR AREA</h3>
                <div className='u-profile-grp'>
                    <h4 className='user-loc'>Cainta Greenpark, Cainta Rizal</h4>
                </div>
            </div>
            {showPSpan("Help people near you connect with you. Pin your area on the maps to set.")}
            <UprofileStatus coach={coach} changeUserStatus={changeUserStatus} isEditingInfo={isEditingInfo} teaches={teaches} changeTeaches={changeTeaches} />
            {showPSpan("Are you a coach or a student?")}


            <div className='save-changes'>
                {console.log("SHOWSAVE? ", showSave)}
                {showSave
                    ? (
                        <button onClick={changeUserData}>Save Changes</button>
                    )
                    : null}
            </div>



        </div>
    )
}

export default UprofileContents