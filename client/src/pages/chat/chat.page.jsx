import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import io from 'socket.io-client';
import queryString from "query-string";
import UsersList from '../../components/users-list/users-list.component';
import Messages from "../../components/messages/messages.component";
import { Container } from "./chat.styles";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';


let socket;

const ChatPage = ({ location }) => {
    const ENDPOINT = '/';
    const [users, setusers] = useState([]);
    const [user, setUser] = useState({});
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const history = useHistory();


    //  Connect & join user to room
    useEffect(() => {
        const { name, room } = queryString.parse(location.search)
        socket = io(ENDPOINT)

        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert('Username already taken')
                history.push("/");
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
                <Paper elevation={3} >
                    <Picker
                        perLine={2}
                        title="Pick your emoji…"
                        emoji="point_up"
                        enableFrequentEmojiSort
                        onClick={async (emoji, event) => setMessage(`${message}${emoji.native}`)}
                        enableFrequentEmojiSort
                        set='apple'
                        style={{ width: '200px', position: 'relative', bottom: '20px', }} />
                </Paper>
                <Messages message={message} messages={messages} setMessage={setMessage} sendMessage={sendMessage} />
                <UsersList users={users} />
            </Container>
        </div >
    )
}

export default ChatPage;