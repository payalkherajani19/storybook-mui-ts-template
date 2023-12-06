import React, { FC, ReactNode } from 'react';
import { FormLabel, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(({ palette: { text }, spacing }: Theme) => ({
  root: {
    fontSize: 11,
    textTransform: 'uppercase',
    marginBottom: spacing(0.75),
    display: 'block',
    color: text.disabled,
    fontWeight: 600,
  },
}));

type Props = {
  children: ReactNode
}

const Label:FC<Props> = ({ children }) => {
  const classes = useStyles();
  return <FormLabel className={classes.root}>{children}</FormLabel>;
};

export default Label;
