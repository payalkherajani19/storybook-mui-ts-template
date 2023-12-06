import React, { FC, ReactNode } from 'react';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Label from './Label';
import StyledToggleButtons, {
  StyledToggleButtonsProps,
} from './StyledToggleButtons';

const useStyles = makeStyles(({ spacing }: Theme) => ({
  container: {
    width: '100%',
    marginBottom: spacing(1),
  },
}));

export interface ToggleButtonsProps extends StyledToggleButtonsProps {
  label: ReactNode;
}

const ToggleButtons: FC<ToggleButtonsProps> = ({ label, ...props }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Label>{label}</Label>
      <StyledToggleButtons {...props} />
    </div>
  );
};

export default ToggleButtons;
