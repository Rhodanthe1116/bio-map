import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'


// my components
import TreeDetail from './TreeDetail'

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: 400,
        maxWidth: '90vw',
    },
}))

export default function TreeDetailDrawer({ open, onClose, tree }) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    if (tree === null) {
        return <></>
    }
    return (
        <div>
            <Drawer
                anchor="left"
                open={open}
                onClose={onClose}
            >
                <div className={classes.drawer}>
                    <TreeDetail tree={tree} />
                </div>
            </Drawer>
        </div>
    );
}

TreeDetailDrawer.propTypes = {
    tree: PropTypes.shape({
        id: PropTypes.number,
        chineseTreeName: PropTypes.string,
        englishTreeName: PropTypes.string,
        scientificTreeName: PropTypes.string,
        growthFrom: PropTypes.string,
        season: PropTypes.string,
        isCommon: PropTypes.bool,
    }).isRequired,
};

TreeDetailDrawer.defaultProps = {
    tree: {
        id: 0,
        chineseTreeName: '克利巴椰子',
        englishTreeName: 'Giriba Palm, Queen Palm',
        scientificTreeName: 'Syagrus romanzoffiana',
        growthFrom: '喬木',
        season: 'spring',
        isCommon: true,
        co: "N 1-10_0205",
        createTime: "2012-05-06T02:23:11.000Z",
        treeHeight: "11.24",
        treeCrownHeight: "11.4728",
        treePath: "29.921",
        treePerimeter: "94",
    }
};