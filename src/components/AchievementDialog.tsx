import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory,
} from "react-router-dom"
import Image from 'material-ui-image'

import { createStyles, Theme, withStyles, WithStyles, makeStyles } from '@material-ui/core/styles';

import MuiDialogActions from '@material-ui/core/DialogActions';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ButtonBase, { ButtonBaseProps } from '@material-ui/core/ButtonBase';

// model
import Achievement from '../models/Achievement';

// my components
import PageDialog from './PageDialog';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '100%',
        height: '72px',
    },
}));

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export interface AchievementDialogProps {
    open: boolean;
    onClose: any;
}
export default function AchievementDialog(props: AchievementDialogProps) {
    const classes = useStyles();
    let history = useHistory();

    const { open, onClose } = props;

    const [type, setType] = useState('intro');
    const [achievements, setAchievements] = useState([]);
    const [error, setError] = useState(false);
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
    useEffect(() => {
        setAchievements([])
        const root = process.env.REACT_APP_DATA_PROVIDER_URL;
        const action = '/achievements'
        fetch(`${root}${action}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('get achievements failed')
                }
                return response.json()
            })
            .then((jsonResponse) => {

                setAchievements(jsonResponse)
            })
            .catch(error => {
                setError(error.toString())
            })
    }, [])

    function handleClose() {
        setType('intro');
        onClose();
    };

    function handleItemClick(achievement: Achievement) {
        history.push(`/achievement/${achievement.name}`)
        setSelectedAchievement(achievement);
    }
    if (!open) {
        return <></>
    }
    return (
        <div>
            <PageDialog open={open}
                primary="成就"
                secondary="Achievement"
                onClose={handleClose}
                dialogActions={<></>}
            > 
                {selectedAchievement &&
                    selectedAchievement.name.concat(JSON.stringify(selectedAchievement.questions))
                }
                {selectedAchievement === null &&
                    <AchievementList achievements={achievements} onItemClick={handleItemClick} />
                }
            </PageDialog>
        </div>
    );
}

export interface AchievementListProps {
    achievements: Achievement[];
    onItemClick: ((achievement: Achievement) => void) | undefined;
}

const AchievementList: React.FC<AchievementListProps> = ({ achievements, onItemClick, children }) => {
    const classes = useStyles();
    function handleItemClick(achievement: Achievement) {
        if (onItemClick) {
            onItemClick(achievement)
        }
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3} alignContent="stretch" alignItems="stretch">
                {achievements.map((achievement: Achievement) => (
                    <Grid item xs={4}>
                        <ButtonPaper onClick={() => handleItemClick(achievement)}>
                            🎈
                            {achievement.name}
                        </ButtonPaper>
                    </Grid>
                ))

                }

                <Grid item xs={4}>
                    <ButtonPaper >
                        🎈薔薇科達人
                    </ButtonPaper>
                </Grid>
                <Grid item xs={4}>
                    <ButtonPaper>
                        🎈芸香科達人
                    </ButtonPaper>
                </Grid>
                <Grid item xs={4}>
                    <ButtonPaper>
                        禾本科達人
                    </ButtonPaper>
                </Grid>
                <Grid item xs={4}>
                    <ButtonPaper>
                        菊科達人
                    </ButtonPaper>
                </Grid>
                <Grid item xs={4}>
                    <ButtonPaper>
                        型態藏寶地圖
                    </ButtonPaper>
                </Grid>
            </Grid>
        </div>
    )
}

export interface ButtonPaperProps {

}
const ButtonPaper: React.FC<ButtonBaseProps> = ({ onClick, children }) => {
    const classes = useStyles();

    return (
        <ButtonBase style={{ width: '100%', }} onClick={onClick}>
            <Paper className={classes.paper}>
                {children}
            </Paper>
        </ButtonBase>
    )
}