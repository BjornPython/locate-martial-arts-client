import React from 'react'
import { useMemo } from 'react'
import UuserMessage from '../../loggedin/Messages/UuserMessage'
import UmessageUsers from '../../loggedin/Messages/UmessageUsers'
function Gmessages({
    chats, changeConvo, currentMessages, addMessage, userId, chatName,
    convoId, messages, toggleSeenConvo
}) {

    const uMessageUsersMemo = useMemo(() => {
        return (
            <UmessageUsers chats={chats} changeConvo={changeConvo} messages={messages} toggleSeenConvo={toggleSeenConvo} />
        )
    }, [chats, messages])


    return (
        <div id='u-messages' className="u-messages">
            <div className='u-m-page'>
                {uMessageUsersMemo}
                <hr />
                <UuserMessage currentMessages={currentMessages} userId={userId} chatName={chatName}
                    addMessage={addMessage} convoId={convoId} />
            </div>

        </div>
    )
}

export default Gmessages