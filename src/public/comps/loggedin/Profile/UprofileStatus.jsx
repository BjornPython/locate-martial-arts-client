import { useEffect, useMemo, useState } from 'react'
import UprofileTeaches from './UprofileTeaches'



function UprofileStatus({ coach, changeUserStatus, teaches, changeTeaches, isEditingInfo }) {

    useEffect(() => {
    }, [coach])

    const callChangeUserStatus = (val) => {
        changeUserStatus(val)
    }


    return (
        <>

            <div className='u-profile-marts'>
                <h3>ACCOUNT STATUS</h3>
                <div className="u-status">
                    <div className={`user-coach what-status ${coach && "what-status-active"}`} onClick={() => { callChangeUserStatus(1) }}>
                        <span></span>
                        <div className="status-txt"><h4>Coach</h4></div>
                    </div>

                    <div className={`user-stud what-status ${!coach && "what-status-active"}`} onClick={() => { callChangeUserStatus(0) }}>
                        <span></span>
                        <div className="status-txt"><h4>Student</h4></div>
                    </div>

                </div>

            </div>
            {coach && isEditingInfo && <UprofileTeaches teaches={teaches} changeTeaches={changeTeaches} />}
        </>
    )
}

export default UprofileStatus