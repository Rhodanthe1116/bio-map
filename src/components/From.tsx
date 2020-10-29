import React, { useState } from 'react';
import Image from 'material-ui-image'

import { createStyles, Theme, withStyles, WithStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// model
import { Tree } from '../models/Tree';

// my components


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export interface FormProps {
    tree: Tree | null;
}

export default function Form(props: FormProps) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const { tree } = props;
    const species = tree?.species;
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Image
                alt={tree?.name}
                disableSpinner
                src={'../img/tree.png'}
            />
            <Typography variant="body1" gutterBottom>
                {species?.name} {'>'} 型態
            </Typography>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                <Tab label="外觀" {...a11yProps(0)} />
                <Tab label="莖" {...a11yProps(1)} />
                <Tab label="葉" {...a11yProps(2)} />
                <Tab label="花" {...a11yProps(3)} />
                <Tab label="果實" {...a11yProps(4)} />
            </Tabs> 
            <TabPanel value={value} index={0}>
                <Typography gutterBottom>
                    {species?.form?.description}
                </Typography>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Typography gutterBottom>
                    {species?.stem?.description}
                </Typography>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Typography gutterBottom>
                    {species?.leaf?.description}
                    {species?.leaf?.note}
                </Typography>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Typography gutterBottom>
                    {species?.flower?.description}
                    {species?.flower?.note}
                </Typography>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Typography gutterBottom>
                    {species?.fruit?.description}
                    {species?.fruit?.note}
                </Typography>
            </TabPanel>
        </div >
    );
}

