import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GoogleMapReact from 'google-map-react';

const useStyles = makeStyles({
    googleMap: {
        width: '100%',
        height: '100%',
        cursor: 'initial',
        '& div': {
            zIndex: '0',
        },
    },
});

function GoogleMap({ children, ...props }) {
    const classes = useStyles()
    return (
        <div className={classes.googleMap}>
            <GoogleMapReact
                bootstrapURLKeys={null}
                options={{
                    draggableCursor: 'initial',
                    zoomControl: false,
                    gestureHandling: 'greedy',
                    clickableIcons: false
                }}
                {...props}
            >
                {children}
            </GoogleMapReact>
        </div>
    )
}

GoogleMap.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
};

GoogleMap.defaultProps = {
    children: null,
};

export default GoogleMap;
