import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';

let messageList = [];

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        // overflow: 'auto',
        width: '100%',
        height: 400,
        maxWidth: 800,
    },
    scrollBar: {
        overflow: 'auto',
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        padding: 0,
        // backgroundColor: 'inherit',
        margin: "1px 0"
    },
    listItem: {
        // margin: "1px 0",
        padding: "0px 16px",
        'word-wrap': 'break-word'
    },
}));



export default function Messages({ message, messages, setMessage, sendMessage }) {
    const classes = useStyles();
    messageList = messages

    let messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages]);
    useEffect(() => {

        console.log('getting called');
    }, [message]);


    return (
        <div>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                <Card raised className={classes.root} style={{
                    overflow: 'hidden',
                    'overflow-y': 'scroll',
                }}>
                    <div className={classes.root}>
                        <ul className={classes.ul}>
                            <div>
                                {messages.map((message, index) => (
                                    <ListItem className={classes.listItem} key={`${index}`}>
                                        <ListItemText primary={`${message.user}: ${message.text}`} />
                                    </ListItem>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </ul>

                    </div>
                </Card>
                <Card
                    style={{
                        height: 50
                    }}
                    raised className={classes.root}>
                    <input style={{
                        fontSize: 18,
                        width: 700,
                        height: 55,
                        outline: 'none',
                        size: "100",
                        border: 0
                    }}
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}

                        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                    >
                    </input>
                    <SendIcon />
                </Card>
            </Grid>
        </div >
    );
}

