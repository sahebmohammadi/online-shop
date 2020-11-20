import { useState } from 'react';
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
    justifyContent: 'center',
    width: '58vw',
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
const MyStepper = ({ children, activeStep, setActiveStep, steps }) => {
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
              <StepButton onClick={handleStep(index)} completed={completed[index]}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        {children}
        <div className={classes.stepControl}>
          {activeStep === steps.length ? (
            <div>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <div>
                <Button
                  style={{ marginLeft: '20px' }}
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  بازگشت
                </Button>
                {
                  <Button
                    disabled={activeStep === steps.length - 1}
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    بعدی
                  </Button>
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default MyStepper;
