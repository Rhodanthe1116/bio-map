import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';

const useStyles = makeStyles((theme) => ({

    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
}));

const steps = ['基本資訊', '付款資訊', '確認'];


function getStepContent(step, tree) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review tree={tree} />;
        default:
            throw new Error('Unknown step');
    }
}


export default function DonateDialog({ open, onClose, tree }) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    function handleClose() {
        onClose()
        setActiveStep(0)
    }

    return (

        <Dialog className={classes.paper} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent>

                <Typography component="h1" variant="h4" align="center">
                    認養樹木
                </Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <React.Fragment>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                謝謝你的認養。
                            </Typography>
                            <Typography variant="subtitle1">
                                你的認養編碼是 #2001539。我們已經發送一封認養明細至你的電子郵件。
                            </Typography>
                        </React.Fragment>
                    ) : (
                            <React.Fragment>
                                {getStepContent(activeStep, tree)}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} className={classes.button}>
                                            上一步
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? '認養' : '下一步'}
                                    </Button>
                                </div>
                            </React.Fragment>
                        )}
                </React.Fragment>
            </DialogContent>

        </Dialog>
    );
}