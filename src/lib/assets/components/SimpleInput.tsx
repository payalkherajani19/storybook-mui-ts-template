import React, {
  CSSProperties,
  useRef,
  useEffect,
  FC,
  ChangeEvent,
} from 'react';
import { makeStyles } from '@mui/styles';
import { InputBase } from '@mui/material';

const useStyles = makeStyles(() => ({
  root: {
    color: 'inherit',
    textAlign: 'inherit',
    fontWeight: 'inherit',
    '& input': {
      padding: 0,
      color: 'inherit',
      textAlign: 'inherit',
      fontWeight: 'inherit',
    },
  },
}));

interface Props {
  value?: string;
  onChange?: (text: string) => void;
  style?: CSSProperties;
}

const SimpleInput: FC<Props> = ({ value, onChange, style }) => {
  const classes = useStyles();
  const textRef = useRef(value ?? '');

  const handleChange = (
    ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    textRef.current = ev.target.value;
  };

  useEffect(() => {
    if (value !== textRef.current) {
      onChange?.(textRef.current);
    }
  }, [textRef.current]);
  return (
    <InputBase
      fullWidth
      className={classes.root}
      defaultValue={textRef.current}
      onChange={handleChange}
      style={style}
    />
  );
};

export default SimpleInput;
