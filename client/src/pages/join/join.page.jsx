import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function JoinPage() {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <Grid
            container
            spacing={10}
            direction="row"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >
            <Paper elevation={3} style={{
                width: 300,
                padding: 20
            }}>
                <AccountCircleIcon fontSize="large" />
                <br />
                <br />
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField onChange={(event) => {
                        setName(event.target.value)
                        console.log(name);

                    }} id="outlined-basic" placeholder='name' variant="outlined" />
                    <br />
                    <TextField onChange={(event) => setRoom(event.target.value)} id="outlined-basic" placeholder='room' variant="outlined" />
                    <Link onClick={(event) => (!name | !room) ? event.preventDefault() : null} to={`/chat?name=${name}&&room=${room}`} style={{ textDecoration: 'none' }}>
                        <Button size='large' type='submit' variant="contained" style={{ color: 'white', backgroundColor: '#469ac6', padding: '15px 95px' }} disableElevation>Join</Button>
                    </Link>
                    {/* //blue:469ac6,green:56bd23,violet:384a95 */}

                </form>
            </Paper>
        </Grid>
    );
}