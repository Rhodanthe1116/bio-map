import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// components
import NatureIcon from '@material-ui/icons/Nature'
import Fab from '@material-ui/core/Fab';
import { lightBlue, deepOrange, amber, red } from '@material-ui/core/colors';

// season icons
import EcoIcon from '@material-ui/icons/EcoOutlined';
import SpaIcon from '@material-ui/icons/SpaOutlined';
import WbSunnyIcon from '@material-ui/icons/WbSunnyOutlined';
import AcUnitIcon from '@material-ui/icons/AcUnitOutlined';

// area icons
import StreetviewIcon from '@material-ui/icons/Streetview';
import OpacityIcon from '@material-ui/icons/Opacity';
import LocationCityIcon from '@material-ui/icons/LocationCityOutlined';
import LocalHospitalOutlinedIcon from '@material-ui/icons/LocalHospitalOutlined';

import Zoom from '@material-ui/core/Zoom';

// my components
import SpeedDials from './SpeedDials'
import { Typography } from '@material-ui/core';
import Logo from './Logo';

const useStyles = makeStyles((theme) => ({
    title: {
        width: 'auto',
        height: 'auto',
        padding: theme.spacing(1, 3),
        borderRadius: 64,
        zIndex: 100,
        color: theme.palette.primary.contrastText,
    },
    floatingNavgationBar: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        position: 'absolute',
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
    titleLogo: {
        marginRight: theme.spacing(1),
    },
    icon: {
        color: theme.palette.accent.main
    }

}));

export default function FloatingNavgationBar({ filter, onFilterChange }) {
    const classes = useStyles();

    return (
        <div className={classes.floatingNavgationBar}>
            <Zoom in={true}>
                <Fab
                    variant="extended"
                    color="primary"
                    aria-label="title"
                    className={classes.title}
                    onClick={() => onFilterChange({ type: 'all', value: 'on' })}
                >
                    {/* <NatureIcon /> */}
                    <Logo className={classes.titleLogo} />
                    <Typography
                        variant="h6"
                    >
                        生多地圖
                    </Typography>
                </Fab>
            </Zoom>
            <SpeedDials
                type="common"
                icon={<NatureIcon className={classes.icon} />}
                onActionClick={onFilterChange}
                actions={[
                    { icon: <NatureIcon color="primary" />, name: '大王椰子' },
                    { icon: <NatureIcon color="primary" />, name: '樟樹' },
                    { icon: <NatureIcon color="primary" />, name: '白千層' },
                    { icon: <NatureIcon color="primary" />, name: '正榕' },
                    { icon: <NatureIcon color="primary" />, name: '臺灣欒樹' },
                ]}
            />
            <SpeedDials
                type="season"
                icon={<EcoIcon className={classes.icon} />}
                onActionClick={onFilterChange}
                actions={[
                    { icon: <EcoIcon color="primary" />, name: '春天', value: 'spring' },
                    { icon: <WbSunnyIcon style={{ color: amber[700] }} />, name: '夏天', value: 'summer' },
                    { icon: <SpaIcon style={{ color: deepOrange[700] }} />, name: '秋天', value: 'autumn' },
                    { icon: <AcUnitIcon style={{ color: lightBlue[500] }} />, name: '冬天', value: 'winter' },
                ]}
            />
            <SpeedDials
                type="area"
                icon={<StreetviewIcon className={classes.icon} />}
                onActionClick={onFilterChange}
                actions={[
                    { icon: <LocationCityIcon style={{ color: deepOrange[200] }} />, name: '總區' },
                    { icon: <OpacityIcon style={{ color: lightBlue[500] }} />, name: '水源' },
                    { icon: <LocalHospitalOutlinedIcon style={{ color: red[500] }} />, name: '城中' },
                ]}
            />
        </div>
    );
}