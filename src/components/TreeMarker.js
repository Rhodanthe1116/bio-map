import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import PropTypes from 'prop-types';

import TreeIcon from './TreeIcon';
import FlowerIcon from './FlowerIcon';

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
    const [error, setError] = useState(false);

    const thisMonth = new Date().getMonth()
    const flower = tree?.species?.flower?.startMonth <= thisMonth && thisMonth <= tree?.species?.flower?.endMonth
    const handleClick = (event) => {
        onTreeClick(tree)
    };

    if (!show) {
        return <></>
    }

    if (error) {
        return (
            <div>
                { flower ?
                    <FlowerIcon
                        className={classes.marker}
                        onClick={handleClick}
                    />
                    :
                    <TreeIcon
                        className={classes.marker}
                        onClick={handleClick}
                    />
                }
            </div>
        )
    }

    return (
        <div>
            { flower ?
                <img src={`/icons/${tree?.species?.scientificName}.png`}
                    onClick={handleClick}
                    onError={() => setError(true)}
                />
                :
                <img src={`/icons/${tree?.species?.scientificName}-2.png`}
                    onClick={handleClick}
                    onError={() => setError(true)}
                />
            }
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