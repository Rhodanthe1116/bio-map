import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import UserLocationIcon from '@material-ui/icons/RadioButtonChecked';

const useStyles = makeStyles({

    marker: {
        cursor: 'pointer',

    },
})

// Marker component
function UserMarker({ show, open }) {
    const classes = useStyles()

    if (!show) {
        return <></>
    }

    return (
        <div>
            <UserLocationIcon
                className={classes.marker}
                color={open ? "secondary" : "primary"}
            />
        </div>
    );
};

export default UserMarker