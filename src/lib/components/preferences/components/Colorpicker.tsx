import React, { FC, ReactNode, useState } from 'react';
import { InputAdornment, Popover, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  bindPopover,
  bindTrigger,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import { nanoid } from 'nanoid';
import { ColorResult, SketchPicker, SketchPickerProps } from 'react-color';
import Input from './Input';

const useStyles = makeStyles(({ spacing, palette: { divider } }: Theme) => ({
  inputRoot: {
    paddingLeft: spacing(1),
  },
  inputAdornedStart: {
    paddingLeft: 0,
  },
  icon: {
    border: `1px solid ${divider}`,
    width: spacing(2.25),
    height: spacing(2.25),
    borderRadius: '50%',
  },
}));

export interface ColorpickerProps
  extends Omit<SketchPickerProps, 'value' | 'onChange'> {
  label?: ReactNode;
  value: string;
  onChange: (value: string) => void;
}

const Colorpicker: FC<ColorpickerProps> = ({
  label,
  value,
  onChange,
  ...props
}) => {
  const popupState = usePopupState({
    popupId: nanoid(),
    variant: 'popover',
    disableAutoFocus: true,
  });
  const [color, setColor] = useState(value);
  const classes = useStyles();
  const startAdornment = (
    <InputAdornment position="start">
      <span className={classes.icon} style={{ backgroundColor: value }} />
    </InputAdornment>
  );

  const handleSketchChange = (e: ColorResult) => {
    setColor(e.hex);
    onChange(e.hex);
  };

  const colorPicker = (
    <Popover {...bindPopover(popupState)}>
      <SketchPicker
        disableAlpha
        styles={{ default: { picker: { boxShadow: 'none' } } }}
        {...props}
        color={value}
        onChange={handleSketchChange}
      />
    </Popover>
  );
  return (
    <>
      <Input
        label={label}
        InputProps={{
          readOnly: true,
          startAdornment: value ? startAdornment : undefined,
          classes: {
            root: classes.inputRoot,
            inputAdornedStart: classes.inputAdornedStart,
          },
        }}
        placeholder="Default"
        value={color}
        onChange={onChange}
        {...bindTrigger(popupState)}
        clearable
      />
      {colorPicker}
    </>
  );
};

export default Colorpicker;
