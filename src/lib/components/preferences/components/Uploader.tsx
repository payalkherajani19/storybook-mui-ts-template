import React, {
  FC,
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  MouseEvent,
} from 'react';
import { Trans } from '@lingui/macro';
import {
  Box,
  Button,
  CircularProgress,
  CircularProgressProps,
  Theme,
  Typography,
} from '@mui/material';
import { CloudUploadOutlined } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { StyledTextFieldProps } from './StyledTextField';

const useStyles = makeStyles(
  ({
    spacing,
    palette: { divider, action, text, background },
    shape: { borderRadius },
    transitions,
  }: Theme) => ({
    container: {
      width: '100%',
      position: 'relative',
      height: 100,
      border: `1px solid ${divider}`,
      borderRadius,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      color: text.disabled,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      height: '100%',
      width: '100%',
      opacity: 0,
      zIndex: 3,
      transition: transitions.create('opacity'),
      backgroundColor: action.focus,
      color: text.primary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    darkOverlay: {
      backgroundColor: action.active,
      color: background.paper,
    },
    input: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      height: '100%',
      width: '100%',
      opacity: 0,
      cursor: 'pointer',
      zIndex: 5,
      '&:hover + $overlay': {
        opacity: 1,
      },
    },
    placeholder: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    icon: {
      fontSize: 28,
    },
    preview: {
      height: '100%',
      width: '100%',
      padding: spacing(0.4),
    },
    img: {
      maxWidth: '100%',
      maxHeight: '100%',
      margin: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loader: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      height: '100%',
      width: '100%',
      position: 'absolute',
      zIndex: 6,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      backgroundColor: action.active,
      color: background.default,
      padding: spacing(0.5),
    },
    button: {
      top: spacing(-3.5),
      right: 0,
      position: 'absolute',
      textTransform: 'none',
    },
  })
);

const CircularProgressWithLabel: FC<CircularProgressProps> = (props) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="inherit">
          {`${Math.round(props.value ?? 0)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

const Uploader: FC<StyledTextFieldProps> = ({ value, onChange }) => {
  const imgSrc = useRef(value);
  const [progress, setProgress] = useState(false);
  const classes = useStyles();
  const handleImageEvent = (ev: ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setProgress(true);
          imgSrc.current = ev.target.result as string;
          const formData = new FormData();
          formData.append('image', file);
          fetch(process.env.REACT_APP_IMAGE_UPLOAD_URL!, {
            body: formData,
            method: 'POST',
          })
            .then((response) => response.json())
            .then((response) => {
              onChange(response.image);
            });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if (imgSrc.current !== value) {
      imgSrc.current = value;
    }
    if (progress) {
      setProgress(false);
    }
  }, [value]);
  const removeImage = (e: MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };
  return (
    <div className={classes.container}>
      {!!imgSrc.current && (
        <Button onClick={removeImage} size="small" className={classes.button}>
          <Typography color="error" variant="caption">
            <Trans>Remove Image</Trans>
          </Typography>
        </Button>
      )}
      <input
        onChange={handleImageEvent}
        accept="image/*"
        type="file"
        className={classes.input}
      />
      {imgSrc.current ? (
        <>
          <div className={clsx(classes.overlay, classes.darkOverlay)}>
            <CloudUploadOutlined className={classes.icon} />
            <Typography variant="caption">
              <Trans>Change Image</Trans>
            </Typography>
          </div>
          <div className={classes.preview}>
            <img
              src={imgSrc.current as string}
              className={classes.img}
              alt=""
            />
          </div>
        </>
      ) : (
        <>
          <div className={classes.overlay} />
          <div className={classes.placeholder}>
            <CloudUploadOutlined className={classes.icon} />
            <Typography variant="caption">
              <Trans>Drag and drop or click to upload</Trans>
            </Typography>
          </div>
        </>
      )}
      {progress && (
        <div className={classes.loader}>
          <CircularProgress
            disableShrink
            size={20}
            variant="indeterminate"
            color="inherit"
          />
        </div>
      )}
    </div>
  );
};

export default Uploader;
