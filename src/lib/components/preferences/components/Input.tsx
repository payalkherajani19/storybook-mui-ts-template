import React, { FC } from 'react';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Label from './Label';
import StyledTextField, { StyledTextFieldProps } from './StyledTextField';

const useStyles = makeStyles(({ spacing }: Theme) => ({
  container: {
    width: '100%',
    margin: spacing(1, 0),
  },
}));

export interface InputProps extends StyledTextFieldProps {}

const Input: FC<StyledTextFieldProps> = ({ label, ...props }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Label>{label}</Label>
      <StyledTextField {...props} />
    </div>
  );
};

export default Input;
