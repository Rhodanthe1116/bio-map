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
import Button from '@material-ui/core/Button';
import ButtonBase, { ButtonBaseProps } from '@material-ui/core/ButtonBase';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

// model
import Achievement from '../models/Achievement';
import Question from '../models/Question';

// my components
import PageDialog from './PageDialog';
import { Typography } from '@material-ui/core';

// data provider
import dataProvider from '../dataProvider'

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
    stepper: {
        padding: theme.spacing(1, 0, 3),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(2),
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
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        setAchievements([])
        setLoading(true)

        dataProvider.getAchievements()
            .then(achievements => {
                setAchievements(achievements)
            })
            .catch(error => {
                console.error(error)
                setError(`Error getting achievements QQ ${error}`)
            })
        setLoading(false)
    }, [])

    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

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
                    <Quiz questions={selectedAchievement.questions} />
                    // <AchievementDetail achievement={selectedAchievement} />
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

export interface AchievementDetailProps {
    achievement: Achievement;
}

const AchievementDetail: React.FC<AchievementDetailProps> = ({ achievement }) => {
    const classes = useStyles();

    return (
        <div className={classes.root} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>

            <div >
                <Typography variant="h4">

                    {achievement.name}
                </Typography>

                <div style={{ textAlign: 'center' }}>
                    <Typography variant="h1">
                        🎍
                    </Typography>
                    <br />
                </div>
                <Typography variant="body1">
                    {achievement.name}
                </Typography>
            </div>



            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', textAlign: 'center', flexGrow: 1, paddingBottom: '16px' }}>
                <Typography variant="body2" >
                    達成80%即可獲得此成就
                </Typography>
                <Button >開始測驗</Button>
            </div>

        </div>
    )
}








export interface QuizProps {
    questions: Question[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [submitted, setSubmitted] = useState(false)
    const last = questions.length - 1
    // const [answer, setAnswer] = useState<string | null>(null);
    const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
    const answer = answers[activeStep]
    const question = questions[activeStep]
    const score = submitted ? Math.round(calScore()) : 0
    const passed = score >= 80
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAnswer = (event.target as HTMLInputElement).value
        // setAnswer(newAnswer);
        let newAnswers = [...answers]
        newAnswers[activeStep] = newAnswer
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (activeStep === last) {
            handleEnd()
        } else {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        if (activeStep === 0) {
            handleCancel()
        } else {
            setActiveStep(activeStep - 1);
        }
    };

    function handleClose() {
        // onClose()
        setActiveStep(0)
    }

    function handleEnd() {
        setSubmitted(true)


    }

    function calScore() {
        let score = 0
        for (let i = 0; i < questions.length; i++) {
            if (answers[i] === questions[i].answer) {
                score += 100 / questions.length
            }
        }
        return score
    }
    async function share() {

        const shareData = {
            title: '生多地圖成就測驗',
            text: `我高分通過了XXX測驗，並獲得了${score}分！快來生多地圖跟我一起探索生物世界吧！`,
            url: 'https://bio-map.netlify.app/',
        }
        let myNavigator: any
        myNavigator = window.navigator
        if (myNavigator && myNavigator.share) {
            try {
                const res = await myNavigator.share(shareData)
            } catch (error) {
                console.error(error)
                alert(error.toString())
            }
        } else {
            console.log('navigator does not exist')
            alert('navigator does not exist')
        }
    }
    function handleCancel() {
        return
    }

    function renderPassed() {
        return (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', textAlign: 'center', alignContent: 'center' }}>
                <div style={{}}>
                    <Typography variant="body1">
                        🎉🎉🎉🎉🎉🎉
                    </Typography>
                    <Typography variant="body1">
                        恭喜通過測驗！
                    </Typography>
                    <Typography variant="body1">
                        你的分數
                    </Typography>
                    <Typography variant="h5">
                        {score}
                    </Typography>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1, }}>
                    <Typography variant="h1">
                        🎍
                    </Typography>
                    <Typography variant="body1">
                        {'植物小達人'}
                    </Typography>
                </div>


                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', textAlign: 'center', paddingBottom: '16px' }}>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={share}
                    >
                        分享
                    </Button>
                </div>
            </div>
        )
    }
    function renderFailed() {
        return (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', textAlign: 'center', alignContent: 'center' }}>

                <div style={{}}>
                    <Typography variant="body1">
                        你的分數
                    </Typography>
                    <Typography variant="h5">
                        {score}
                    </Typography>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1, }}>
                    <Typography variant="h1">
                        😥
                    </Typography>
                    <Typography variant="body1">
                        {'測驗失敗，請再接再厲！'}
                    </Typography>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', textAlign: 'center', paddingBottom: '16px' }}>
                    <Button color="secondary" variant="contained">重來🙃</Button>
                </div>

            </div>
        )
    }
    if (submitted) {

        if (passed) {
            return renderPassed()
        }
        else {
            return renderFailed()
        }
    }
    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>

            <div >
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {questions.map((question) => (
                        <Step key={question.title}>
                            <StepLabel></StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Typography variant="body2" gutterBottom>
                    🎍第{activeStep + 1}題
                </Typography>
                <Typography variant="body1">
                    {question.title}
                </Typography>
                <div style={{ textAlign: 'center' }}>
                    <Typography variant="h1">

                    </Typography>
                    <br />
                </div>
                <RadioGroup aria-label="gender" name="gender1" value={answer} onChange={handleChange}>
                    <FormControlLabel value="A" control={<Radio />} label={question.options.A} />
                    <FormControlLabel value="B" control={<Radio />} label={question.options.B} />
                    <FormControlLabel value="C" control={<Radio />} label={question.options.C} />
                    <FormControlLabel value="D" control={<Radio />} label={question.options.D} />
                </RadioGroup>
            </div>


            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', textAlign: 'center', flexGrow: 1, paddingBottom: '8px' }}>
                <Typography variant="body2" >
                    答對80%即可獲得此成就
                </Typography>
                <div className={classes.buttons}>

                    <Button onClick={handleBack} className={classes.button} >
                        {activeStep === 0 ? ' ' : '上一步'}
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                    >
                        {activeStep === last ? '提交' : '下一步'}
                    </Button>
                </div>

            </div>
        </div>
    )
}