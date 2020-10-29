import React, { useState } from 'react';
import Image from 'material-ui-image'

import { createStyles, Theme, withStyles, WithStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// model

// my components

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '100%',
    },
}));

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            color: theme.palette.primary.contrastText,
        },
        appBar: {
            position: 'relative',

        },
        title: {
            flex: '0 0 auto',
            marginRight: theme.spacing(1),
        },
        subtitle: {
            flex: '1 1 auto',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            fontStyle: 'italic',
        }
    });

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
    primary: string;
    secondary: string;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, primary, secondary } = props;
    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                {children}
                <Typography className={classes.title} variant="h6">{primary}</Typography>
                <Typography className={classes.subtitle} variant="body2">{secondary}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </Toolbar>
        </AppBar>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

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

    const { open, onClose } = props;

    const [type, setType] = useState('intro');

    const handleClose = () => {
        setType('intro');
        onClose();
    };

    if (!open) {
        return <></>
    }
    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth={'md'}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}
                    primary={'成就'}
                    secondary={'Achievement'}
                >
 
                </DialogTitle>
                <DialogContent dividers>
                    <div className={classes.root}>
                        <Grid container spacing={3} alignContent="stretch" alignItems="stretch">
                            <Grid item xs={4}>
                                <Paper className={classes.paper}>植物用途達人</Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.paper}>薔薇科達人</Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.paper}>芸香科達人</Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.paper}>禾本科達人</Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.paper}>菊科達人</Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.paper}>型態藏寶地圖</Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.paper}>xs=3</Paper>
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
               
            </Dialog>
        </div>
    );
}
