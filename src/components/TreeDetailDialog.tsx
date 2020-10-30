import React, { useState } from 'react';
import Image from 'material-ui-image'

import { createStyles, Theme, withStyles, WithStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

// model
import { Tree } from '../models/Tree';

// my components
import Form from './From';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        height: '80vh',
        maxHeight: '800px',
    },
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
        justifyContent: 'space-between',
    },
}))(MuiDialogActions);

export interface TreeDetailDialogProps {
    open: boolean;
    tree: Tree | null;
    onClose: any;
}
export default function TreeDetailDialog(props: TreeDetailDialogProps) {
    const classes = useStyles();

    const { tree, open, onClose } = props;
    const species = tree?.species;

    const [type, setType] = useState('intro');

    const handleClose = () => {
        setType('intro');
        onClose();
    };

    if (tree === null) {
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
                    primary={species ? species.name : ''}
                    secondary={species ? species.scientificName : ''}
                >

                </DialogTitle>
                <DialogContent className={classes.content} dividers>

                    {type === 'intro' && <Intro tree={tree} />}
                    {type === 'phenology' && <Phenology tree={tree} />}
                    {type === 'usage' && <Usage tree={tree} />}
                    {type === 'form' && <Form tree={tree} />}
                    {type === 'others' && <Others tree={tree} />}
                </DialogContent>
                <DialogActions>
                    {type === 'intro' &&
                        [
                            <Button onClick={() => setType('phenology')} color="primary">
                                {"物侯"}
                            </Button>,
                            <Button onClick={() => setType('usage')} color="primary">
                                {"用途"}
                            </Button>,
                            <Button onClick={() => setType('form')} color="primary">
                                {"型態"}
                            </Button>,
                            <Button onClick={() => setType('others')} color="primary">
                                {"其他"}
                            </Button>,
                        ]
                    }
                    {type !== 'intro' &&
                        <Button onClick={() => setType('intro')} color="primary">
                            {"<"}
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}

export interface IntroProps {
    tree: Tree | null;
}

function Intro(props: IntroProps) {
    const { tree } = props;
    const species = tree?.species;
    return (
        <div>
            {/* <Image
                alt={tree?.name}
                disableSpinner
                src={'../img/tree.png'}
            /> */}
            <Image
                aspectRatio={(4 / 3)}
                alt={tree?.name}
                disableSpinner
                src={`https://source.unsplash.com/345x200/?tree?${species?.scientificName}`}
            />
            <br/>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                {species?.name}
            </Typography>
            <ul>
                <li>編號：{tree?.code}</li>
                <li>樹高：{tree?.height}</li>
                <li>胸高直徑：{tree?.dbh?.avg}</li>
                <li>樹冠幅：{tree?.crownWidth}</li>
            </ul>
            <Typography gutterBottom>
                {species?.form?.description || '暫無資訊'}
            </Typography>
        </div>
    )
}

export interface PhenologyProps {
    tree: Tree | null;
}

function Phenology(props: PhenologyProps) {
    const { tree } = props;
    const species = tree?.species;
    return (
        <div>
            <Image
                aspectRatio={(4 / 3)}
                alt={tree?.name}
                disableSpinner
                src={`https://source.unsplash.com/345x200/?tree?${species?.scientificName}Phenology`}
            />
            <br />
            <Typography variant="body2" color="textSecondary" gutterBottom>
                {species?.name} {'>'} 物候
            </Typography>
            <ul>
                <li>花期：{species?.flower?.startMonth} ~ {species?.flower?.endMonth} 月</li>
                <li>果期：{species?.fruit?.startMonth} ~ {species?.fruit?.endMonth} 月</li>
            </ul>
        </div>
    )
}

export interface UsageProps {
    tree: Tree | null;
}

function Usage(props: UsageProps) {
    const { tree } = props;
    const species = tree?.species;
    return (
        <div>
            <Image
                aspectRatio={(4 / 3)}
                alt={tree?.name}
                disableSpinner
                src={`https://source.unsplash.com/345x200/?tree?${species?.scientificName}Usage`}
            />
            <br />
            <Typography variant="body2" color="textSecondary" gutterBottom>
                {species?.name} {'>'} 用途
            </Typography>
            <Typography gutterBottom>
                {species?.usage || '暫無資訊'}
            </Typography>
        </div>
    )
}
export interface OthersProps {
    tree: Tree | null;
}

function Others(props: OthersProps) {
    const { tree } = props;
    const species = tree?.species;
    return (
        <div>
            <Image
                aspectRatio={(4 / 3)}
                alt={tree?.name}
                disableSpinner
                src={`https://source.unsplash.com/345x200/?tree?${species?.scientificName}Others`}
            />
            <br />
            <Typography variant="body2" color="textSecondary" gutterBottom>
                {species?.name} {'>'} 其他
            </Typography>
            <Typography gutterBottom>
                {species?.others || '暫無資訊'}
            </Typography>
        </div>
    )
}