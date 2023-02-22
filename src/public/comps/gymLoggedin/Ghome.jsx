import React from 'react'
import { useEffect, useState } from 'react'
import Unav from '../loggedin/Unav'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../../features/authentication/authSlice'
import UlogoutWarning from '../loggedin/UlogoutWarning'
import apiService from '../../../features/apis/apiService'
import Gprofile from './profile/Gprofile'
import Gmaps from './maps/Gmaps'
import Gmessages from './messages/Gmessages'

import io from 'socket.io-client';
const socket = io(`${process.env.REACT_APP_BACKEND_ENDPOINT}`)


function Ghome({ user, userType }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState("profile")
    const [showLogout, setShowLogout] = useState(false)
    const [gymInfo, setGymInfo] = useState({
        name: "",
        location: { lat: 0, long: 0 },
        awards: [],
        marts: {},
        messages: {}
    })

    // STATES FOR MESSAGES
    const [messages, setMessages] = useState({})
    const [userId, setUserId] = useState("") // The id of the user
    const [currentMessages, setCurrentMessages] = useState([])
    const [chats, setChats] = useState({}) // The different chats the user has.

    const [convoId, setConvoId] = useState("") // The convoId of the current user's chat
    const [chatName, setChatName] = useState("")
    const [currentConvoChunk, setCurrentConvoChunk] = useState(null) // The highest Chunk of the current chat





    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user])

    useEffect(() => {
        getGymInfo()
    }, [])

    useEffect(() => {
        if (!gymInfo) { return }
        // Reorganizes the messages data from the database.
        setChats(gymInfo.messages ? gymInfo.messages : {})
        setUserId(gymInfo._id)
        socket.emit("usersRoom", gymInfo._id);

        socket.on("requestJoinRoom", (info) => {
            const { conversationId, newChat } = info
            socket.emit("joinConversation", { conversationId, token: user })
            setChats((prevState) => {
                return newChat
            })
        })

        socket.on("messageContents", (msgData) => {
            setMessages(prevState => {
                const newState = { ...prevState, [msgData.conversationId]: msgData.messageContent }
                return { ...newState }
            })
            setCurrentMessages(msgData.messageContent)
        })


        socket.on("newMessage", (msgData) => {
            console.log("NEW MESSAGE RECEINVED: ", msgData);
            const { conversationId, senderId, message } = msgData
            setMessages(prevState => {
                if (prevState[conversationId]) {
                    const newState = {
                        ...prevState,
                        [conversationId]: [...prevState[conversationId], { senderId, message }]
                    }
                    return { ...newState }
                } else {
                    const newState = {
                        ...prevState,
                        [conversationId]: [{ senderId, message }]
                    }
                    return { ...newState }
                }
            })
            setUserId(prevState => {
                if (prevState !== senderId) {
                    setChats(prevChats => {
                        const newChats = {
                            ...prevChats,
                            [senderId]: { ...prevChats[senderId], seen: false }
                        }
                        return newChats
                    })
                }
                return prevState
            })
            checkCurrentMessages(conversationId, senderId, message)
        }
        )

        socket.on("newChat", (newChat) => {
            setChats(newChat)
            setCurrentPage("messages")
            setConvoId(newChat.conversationId)
            setChatName(newChat.name)
            setCurrentConvoChunk(newChat.highestChunk)
        })




        return () => {
            socket.off("requestJoinRoom");
            socket.off("messageContents");
            socket.off("newMessage");
            socket.off("newChat");
        };
    }, [gymInfo])


    useEffect(() => {
        if (Object.entries(chats).length < 1) { return }
        Object.entries(chats).map(([chatKey, val]) => {
            socket.emit("joinConversation", { conversationId: val.conversationId, token: user })
        })
    }, [chats])


    useEffect(() => {
        if (convoId === "") { return }
        //Everytime time the convoId changes, it will request the new messages.
        console.log("GETTING MESSAGES");
        getMessages(convoId, currentConvoChunk)
    }, [convoId])

    const updateGymLoc = (lat, long) => {
        setGymInfo(prevState => {
            return { ...prevState, location: { lat, long } }
        })
    }

    const getGymInfo = async () => {

        const response = await apiService.getGymInfo(user)
        if (response.data) {
            setGymInfo({ ...response.data, messages: response.data.messages ? response.data.messages : {} })
        }
    }

    const changePage = (page) => {
        if (page === currentPage) { return }
        else { setCurrentPage(page) }
    }

    const toggleShowLogout = () => {
        setShowLogout(!showLogout)
    }

    const CallLogoutUser = () => {
        localStorage.clear();
        dispatch(logout())
        window.location.reload()
    }

    const checkCurrentMessages = (conversationId, senderId, message) => {

        setConvoId(prevState => {

            if (prevState === conversationId || prevState === senderId) {
                setCurrentMessages(prevState => {
                    return [...prevState, { senderId, message }]
                })

            }

            return prevState
        })

    }

    const addMessage = (msg) => {
        console.log("ADDING MSG");
        socket.emit("addMessage", { token: user, conversationId: convoId, message: msg, chunk: currentConvoChunk })
    }

    const createConvo = (participantOne, participantOneId, participantTwo, participantTwoId) => {
        console.log("CREATE CONVO CALLED: ", participantOne, participantOneId, participantTwo, participantTwoId);
        console.log("GYM MESSAGES: ", gymInfo.messages);
        if (!(gymInfo.messages[participantTwoId])) {
            socket.emit("newConvo", { token: user, participantOne, participantOneId, participantTwo, participantTwoId })

        } else {
            setCurrentPage("messages")
            setConvoId(gymInfo.messages[participantTwoId].conversationId)
            setChatName(gymInfo.messages[participantTwoId].name)
            setCurrentConvoChunk(gymInfo.messages[participantTwoId].highestChunk)

        }
    }


    const getMessages = (conversationId, chunk, force = null) => {
        console.log("GET MESSAGES CALLED: ", conversationId, chunk, force);
        if (!messages[conversationId]) {
            console.log("requesting messages");
            socket.emit("requestMessage", { conversationId, chunk, token: user })
        } else if (force) {
            socket.emit("requestMessage", { conversationId, chunk, token: user })
        } else {
            setCurrentMessages(messages[conversationId])
        }

    }

    const changeConvo = (newConvoId, highestChunk, convoName) => {
        // Changes the convo when the user clicks on a chat
        setConvoId(newConvoId)
        setCurrentConvoChunk(highestChunk)
        setChatName(convoName)
    }

    const toggleSeenConvo = (chatId, isSeen) => {
        setChats(prevState => {
            const newState = { ...prevState, [chatId]: { ...prevState[chatId], seen: isSeen } }
            return { ...newState }
        })
        socket.emit("toggleSeen", { token: user, chatId, isSeen })
    }



    return (
        <div className="uhome-page" >
            <Unav changePage={changePage} currentPage={currentPage} toggleShowLogout={toggleShowLogout} />
            <div className={`u-home-pages ${showLogout && "blurred"}`}>
                {currentPage === "search" && <Gmaps info={gymInfo} user={user} updateGymLoc={updateGymLoc} createConvo={createConvo} />}
                {currentPage === "profile" && <Gprofile gymInfo={gymInfo} user={user} />}
                {currentPage === "messages" && <Gmessages chats={chats} getMessages={getMessages} currentMessages={currentMessages}
                    userId={userId} chatName={chatName} addMessage={addMessage} changeConvo={changeConvo} messages={messages} toggleSeenConvo={toggleSeenConvo} />}
            </div>
            <UlogoutWarning showLogout={showLogout} toggleShowLogout={toggleShowLogout} CallLogoutUser={CallLogoutUser} />
        </ div>
    )
}

export default Ghome