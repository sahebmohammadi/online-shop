import { useState } from 'react';
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingBottom: '15px',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepControl: {
    display: 'flex',
    marginTop: '25px',
    justifyContent: 'flex-end',
    width: '57vw',
  },
  backButton: {
    fontFamily: 'Shabnam',
  },
  nextButton: {
    fontFamily: 'Shabnam',
  },
}));
const theme = createMuiTheme({
  overrides: {
    MuiStepConnector: {
      alternativeLabel: {
        top: '12px',
        right: 'calc(-50% + 20px)',
        left: 'calc(50% + 20px)',
        position: 'absolute',
      },
    },
  },
});
const MyStepper = ({ children, activeStep, setActiveStep, steps, isNextStep }) => {
  const classes = useStyles();
  const [completed, setCompleted] = useState({});

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <Stepper
          nonLinear
          activeStep={activeStep}
          alternativeLabel
          classes={{ alternativeLabel: classes.MuiStepConnector }}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel completed={completed[index]}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {children}
        <div className={classes.stepControl}>
          {activeStep !== 0 ? (
            <Button
              variant="outlined"
              style={{ marginLeft: '20px' }}
              // disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
            >
              بازگشت
            </Button>
          ) : null}
          {activeStep == 0 && isNextStep ? (
            <Button
              // disabled={activeStep === steps.length - 1 || !isNextStep}
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.nextButton}
            >
              بعدی
            </Button>
          ) : null}
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default MyStepper;
