import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

import { makeStyles } from '@material-ui/core/styles';

// function Loading({ open  }) {
//     const classes = useStyles()
//     return (
//         <Backdrop className={classes.backdrop} open={open}>
//             <CircularProgress color="secondary" />
//         </Backdrop>
//     )
// }

const useStyles = makeStyles((theme) => ({
    loading: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: theme.spacing(2),
    },
   
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

function Loading() {
    const classes = useStyles();
    const [loading] = React.useState(true);
    const timerRef = React.useRef();

    React.useEffect(
        () => () => {
            clearTimeout(timerRef.current);
        },
        [],
    )

    return (
        <div className={classes.loading}>
            <Fade
                in={loading}
                style={{
                    transitionDelay: loading ? '800ms' : '0ms',
                }}
                unmountOnExit
            >
                <CircularProgress color="primary" />
            </Fade>
        </div>
    )
}


Loading.defaultProps = {
    open: true,
}

export default Loading