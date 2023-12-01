import { FC, KeyboardEvent, MouseEvent, useEffect, useRef } from 'react';
import {
  Dialog,
  IconButton,
  InputAdornment,
  Popover,
  TextFieldProps,
  Theme,
  useMediaQuery,
} from '@mui/material';
import {
  bindPopover,
  bindTrigger,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import { nanoid } from 'nanoid';
import { merge } from 'lodash-es';
import { CloseOutlined } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import useDatepicker from './useDatepicker';
import { DatepickerProps } from './types';

const useStyles = makeStyles({
  dialog: {
    '& .MuiDialog-paper': {
      margin: 0,
    },
  },
  inputAdornment: {
    '&.MuiInputAdornment-positionEnd': {
      marginRight: -4,
      marginLeft: 0,
    },
  },
});

const keycode = {
  ArrowUp: 38,
  ArrowDown: 40,
  ArrowLeft: 37,
  ArrowRight: 39,
  Enter: 13,
  Space: 32,
};

const Datepicker: FC<DatepickerProps> = ({
  disableResponsive,
  PopoverProps,
  DialogProps,
  renderInput: _renderInput,
  PaperProps,
  open,
  onClose,
  onOpen,
  placeholder,
  clearable,
  ...props
}) => {
  const classes = useStyles();
  const isMobileView = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down('sm')
  );
  const popupId = useRef(nanoid()).current;
  const popupState = usePopupState({
    popupId,
    variant: 'popover',
  });

  const {
    datepickerProps,
    Component,
    textValue,
    clear,
    LoadingOverlayComponent,
    handleMonthChange,
  } = useDatepicker({ ...props, onClose: popupState.close });
  const renderInput = _renderInput || datepickerProps.renderInput;

  useEffect(() => {
    if (typeof open !== 'undefined') {
      if (open) {
        !popupState.isOpen && popupState.open();
      } else {
        popupState.isOpen && popupState.close();
      }
    }
  }, [open]);

  useEffect(() => {
    if (popupState.isOpen) {
      onOpen?.();
      handleMonthChange();
    } else {
      onClose?.();
    }
  }, [popupState.isOpen]);

  const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    clear();
  };

  const clearIcon = textValue && (
    <InputAdornment className={classes.inputAdornment} position="end">
      <IconButton onClick={handleClear} size="small">
        <CloseOutlined fontSize="small" />
      </IconButton>
    </InputAdornment>
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (Object.values(keycode).includes(event.keyCode)) {
      event.stopPropagation();
      popupState.open(event);
    }
  };

  const inputProps = merge(
    {},
    bindTrigger(popupState),
    { label: props.label, placeholder, onKeyDown: handleKeyDown },
    props.TextFieldProps,
    {
      value: textValue || '',
      InputProps: {
        ...(clearable ? { endAdornment: clearIcon } : {}),
        ...props.InputProps,
      },
    }
  );

  const renderDatepicker = () => {
    if (isMobileView && !disableResponsive) {
      return (
        <Dialog
          {...DialogProps}
          PaperProps={PaperProps}
          className={clsx(classes.dialog, DialogProps?.className)}
          {...bindPopover(popupState)}
        >
          {Component}
          {LoadingOverlayComponent}
        </Dialog>
      );
    }

    return (
      <Popover
        {...PopoverProps}
        PaperProps={PaperProps}
        {...bindPopover(popupState)}
        {...(props.disabled ? { open: false } : {})}
      >
        {Component}
        {LoadingOverlayComponent}
      </Popover>
    );
  };

  return (
    <>
      {renderInput(inputProps, {})}
      {renderDatepicker()}
    </>
  );
};

Datepicker.defaultProps = {
  displayStaticWrapperAs: 'desktop',
  dateFormat: 'MMM DD, YYYY',
  views: ['year', 'month', 'date'],
  showToolbar: false,
  allowKeyboardControl: true,
  PopoverProps: {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
  },
  TextFieldProps: {
    variant: 'outlined',
    size: 'small',
    InputProps: { readOnly: true },
  },
};

export default Datepicker;
