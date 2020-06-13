import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import queryString from "query-string";
import UsersList from '../../components/users-list/users-list.component';
import Messages from "../../components/messages/messages.component";
import { Container } from "./chat.styles";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

let socket;

const ChatPage = ({ location }) => {
    const ENDPOINT = 'localhost:5000';
    const [users, setusers] = useState([]);
    const [user, setUser] = useState({});
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');


    //  Connect & join user to room
    useEffect(() => {
        const { name, room } = queryString.parse(location.search)
        socket = io(ENDPOINT)

        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        })

        setUser({ id: socket.id, name, room })

    }, [ENDPOINT, location.search])

    // getUsers list and messages
    useEffect(() => {
        socket.on('roomData', ({ users }) => {
            setusers([...users])
        })

        socket.on('message', ({ user, text }) => {
            console.log(`user:${user}, text:${text}`);
            setMessages((messages) => [...messages, { user, text }])
        })
    }, [])

    const sendMessage = event => {
        event.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
            event.target.value = ''
        }
    }

    return (
        <div style={{
            backgroundColor: '#f5f5f5',
            height: '100vh',
        }}>
            <Container>
                <Picker onClick={async (emoji, event) => {
                    await setMessage(`${message}${emoji.native}`)
                    console.log(message);
                }} enableFrequentEmojiSort set='apple' style={{ width: '200px', position: 'relative', bottom: '20px', }} />
                <Messages message={message} messages={messages} setMessage={setMessage} sendMessage={sendMessage} />
                <UsersList users={users} />

            </Container>
        </div >
    )
}

export default ChatPage;