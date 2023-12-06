import React, { ReactNode, FC, ChangeEvent } from 'react';
import { Grid, Switch } from '@mui/material';
import Label from './Label';

export interface ToggleSwitchProps {
  label: ReactNode;
  value: boolean;
  onChange: (value: boolean) => void;
}

const ToggleSwitch: FC<ToggleSwitchProps> = ({ label, value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.checked);

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Label>{label}</Label>
        <Switch onChange={handleChange} checked={value}></Switch>
      </Grid>
    </>
  );
};

export default ToggleSwitch;
