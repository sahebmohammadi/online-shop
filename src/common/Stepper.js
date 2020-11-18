import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

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
  stepperDirection: {
    direction: 'ltr',
  },
}));

const MyStepper = ({ children, activeStep, setActiveStep, steps }) => {
  const classes = useStyles();
  const [completed, setCompleted] = useState({});

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <Stepper
        nonLinear
        activeStep={activeStep}
        alternativeLabel
        classes={{ alternativeLabel: classes.stepperDirection }}
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
    </div>
  );
};

export default MyStepper;
