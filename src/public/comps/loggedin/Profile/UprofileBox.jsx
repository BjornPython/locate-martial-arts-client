import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear } from '@fortawesome/free-solid-svg-icons'
import { useState, useMemo } from 'react'


function UprofileBox({ name, bio, changeNameBio }) {

    const [editing, SetEditing] = useState(false)

    const [newNameBio, setNewNameBio] = useState({ newName: name, newBio: bio })
    const { newName, newBio } = newNameBio

    const handleNameBioChange = ((e) => {
        setNewNameBio((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    })

    const handleSave = async () => {
        changeNameBio(newName, newBio)
        SetEditing(!editing)
    }

    return (
        <div className='profile-box'>
            {editing

                ?
                <div className='profile'>
                    <FontAwesomeIcon icon={faUser} className="profile-avatar" />
                    <div className='profile-info'>
                        <input type="text" name="newName" value={newName} id="" placeholder={name} className={`i-name-edit `} onChange={handleNameBioChange} />
                        <input type="text" name="newBio" value={newBio} id="" placeholder={bio !== "" ? bio : "Edit your bio"} className={`i-bio-edit`} onChange={handleNameBioChange} />
                    </div>
                    <button onClick={handleSave} className="save-name-btn">Save</button>
                </div>
                :

                <div className='profile'>
                    <FontAwesomeIcon icon={faUser} className="profile-avatar" />
                    <div className='profile-info'>
                        <h2 className='i-name'>{name}</h2>
                        <p className='i-bio'>{bio !== "" ? bio : "Edit your bio"}</p>

                    </div>
                </div>
            }

            <FontAwesomeIcon icon={faGear} className="u-setting-icon" onClick={() => { SetEditing(!editing) }} />

        </div>
    );
}

export default UprofileBox