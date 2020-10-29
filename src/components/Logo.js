import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    logo: {
        width: 48,
        height: 48,
        marginRight: theme.spacing(1),
    }

}));

function Logo(props) {
    const classes = useStyles()
    return (
        <img
            {...props}
            className={classes.logo}
            alt="tree logo"
            src="https://image.flaticon.com/icons/png/512/2990/2990684.png"
        />
    )
}

export default Logo