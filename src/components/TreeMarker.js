import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import PropTypes from 'prop-types';

import TreeIcon from './TreeIcon';

const useStyles = makeStyles({

    marker: {
        cursor: 'pointer',

    },
})



// Marker component
function TreeMarker({ show, tree, onDonateClick, onTreeClick }) {
    const classes = useStyles()

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClick = (event) => {
        onTreeClick(tree)
    };

    if (!show) {
        return <></>
    }

    return (
        <div>
            <TreeIcon
                className={classes.marker}
                color={open ? "secondary" : "primary"}
                onClick={handleClick}
            />
        </div>
    );
};

TreeMarker.propTypes = {
    show: PropTypes.bool,
    place: PropTypes.shape({
        name: PropTypes.string,
        formatted_address: PropTypes.string,
        rating: PropTypes.number,
        types: PropTypes.array,
        price_level: PropTypes.number,
        opening_hours: PropTypes.object,
    }).isRequired,
};


export default TreeMarker