import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { FixedSizeList } from 'react-window';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

let usersList = [];

const useStyles = makeStyles((theme) => ({
    root: {
        width: 200,
        backgroundColor: theme.palette.background.paper,
    },
}));

function renderRow(props) {
    const { index, style } = props;

    return (
        <ListItem button style={style} key={index}>
            <FiberManualRecordIcon fontSize='small' style={{ color: 'green' }} />
            <ListItemText primary={`${usersList[index].name}`} />
        </ListItem>
    );
}

renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
};

export default function UsersList({ users }) {
    const classes = useStyles();
    usersList = [...users]

    return (
        <div className={classes.root}>
            <Paper elevation={3} >
                <FixedSizeList height={450} width={200} itemSize={46} itemCount={usersList.length}>
                    {renderRow}
                </FixedSizeList>
            </Paper>
        </div>
    );
}
