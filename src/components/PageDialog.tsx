import React, { useState, FunctionComponent } from 'react';

import { createStyles, Theme, withStyles, WithStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

// model

// my components

const useStyles = makeStyles((theme: Theme) => ({
    content: {
        height: '70vh',
        maxHeight: '800px',
    }
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

export interface PageDialogProps {
    open: boolean;
    primary: string;
    secondary: string;
    onClose: () => void;
    dialogActions: React.ReactNode;
}

const PageDialog: React.FC<PageDialogProps> = ({ open, primary, secondary, onClose, dialogActions, children }) => {
    const classes = useStyles();

    const handleClose = () => {
        onClose();
    };


    return (
        <Dialog
            fullWidth={true}
            maxWidth={'md'}
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle id="customized-dialog-title" onClose={handleClose}
                primary={primary}
                secondary={secondary}
            >
            </DialogTitle>
            <DialogContent className={classes.content} dividers>
                {children}
            </DialogContent>
            {dialogActions}
        </Dialog>
    );
}

export default PageDialog