import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

function FullScreenLoading({ open }) {
    const classes = useStyles()
    return (
        <Backdrop className={classes.backdrop} open={open}>
            <CircularProgress color="secondary" />
        </Backdrop>
    )
}

FullScreenLoading.defaultProps = {
    open: true,
}

export default FullScreenLoading