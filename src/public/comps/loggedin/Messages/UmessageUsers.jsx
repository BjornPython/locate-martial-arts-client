import React, { useEffect, useMemo } from 'react'
import "../../../css/loggedin/umessageUsers.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import uuid from 'react-uuid'


const UserMessages = ({ chatUserId, chat, changeConvo, messages, toggleSeenConvo }) => {



    const lastMessage = useMemo(() => {
        const { conversationId } = chat
        if (messages[conversationId]) {
            const convoIndex = messages[conversationId].length > 0 ? messages[conversationId].length - 1 : null
            if (convoIndex !== null) { return messages[conversationId][convoIndex].message }
            else { return "no convo yet." }
        }
        else { return "..." }
    }, [messages])

    useEffect(() => {
        console.log("NEW MESSAGES: ", messages);
    }, [messages])

    const chatMemo = useMemo(() => {


        return (
            <>
                <div className='user-icon'>
                    <FontAwesomeIcon icon={faCircle} className="profile-pic" />
                </div>

                <div className='user-info'>
                    <h3>{chat.name}</h3>
                    <div className='status-div'>
                        <FontAwesomeIcon icon={faCircle} className="active-icn" />
                        {console.log("CHAT SEEN: ", chat.seen)}
                        {chat.seen
                            ? <p>{lastMessage}</p>
                            : <p style={{ color: "white", "fontWeight": "bold" }}>{lastMessage}</p>}
                    </div>
                </div>
            </>
        )
    }, [chat, messages])


    return (
        <div className='user' onClick={() => {
            changeConvo(chat.conversationId, chat.highestChunk, chat.name)
            toggleSeenConvo(chatUserId, true)
        }}>
            {chatMemo}
        </div>
    )
}



function UmessageUsers({ chats, changeConvo, messages, toggleSeenConvo }) {

    return (
        <div className='u-message-page'>
            {Object.entries(chats).map(([chatUserId, value]) => {
                return <UserMessages key={chatUserId} chatUserId={chatUserId} chat={value}
                    changeConvo={changeConvo} messages={messages} toggleSeenConvo={toggleSeenConvo} />

            })}



        </div>
    )
}

export default UmessageUsers