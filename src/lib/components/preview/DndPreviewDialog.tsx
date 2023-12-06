import React, { FC, useState, useMemo, MouseEvent } from 'react';
import { Trans } from '@lingui/macro';
import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Theme,
  Tooltip,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  CloseOutlined,
  LaptopMacOutlined,
  PhoneIphoneOutlined,
  TabletMacOutlined,
} from '@mui/icons-material';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import clsx from 'clsx';
import { useDndEditorContext } from '../../DndEditorProvider';
import { Device, DeviceType } from '../../types';
import { exportToHtml } from '../../utils';
import './DndPreviewDialog.css';
import { Liquid } from 'liquidjs';

const engine = new Liquid();

const useStyles = makeStyles(
  ({
    spacing,
    shape: { borderRadius },
    palette: { primary, text, divider },
  }: Theme) => ({
    headerActions: {
      position: 'absolute',
      right: spacing(1),
      top: spacing(1),
    },
    toggleButton: {
      borderRadius: `${borderRadius * 2}px!important`,
      border: 'none',
      marginRight: spacing(0.5),
      '&:hover': {
        color: text.primary,
      },
      '&.Mui-selected, &.Mui-selected:hover': {
        color: primary.main,
        backgroundColor: alpha(primary.main, 0.2),
      },
    },
    dialogContent: {
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'auto',
    },
    dialogTitle: {
      display: 'flex',
      alignItems: 'center',
      borderBottom: `1px solid ${divider}`,
    },
    toggleButtons: {
      marginLeft: spacing(2),
    },
    iframe: {
      width: '100%',
      height: '100%',
      overflow: 'auto',
      border: 'none',
      boxShadow: 'none',
    },
  })
);

export interface DndPreviewDialogProps extends Omit<DialogProps, 'children'> {}

const devices: Device[] = [
  {
    type: 'laptop',
    icon: LaptopMacOutlined,
    label: <Trans>Laptop</Trans>,
  },
  {
    type: 'tablet',
    icon: TabletMacOutlined,
    label: <Trans>Tablet</Trans>,
  },
  {
    type: 'mobile',
    icon: PhoneIphoneOutlined,
    label: <Trans>Mobile</Trans>,
  },
];

const DndPreviewDialog: FC<DndPreviewDialogProps> = (props) => {
  const {
    palette: { mode },
  } = useTheme<Theme>();
  const classes = useStyles();
  const editorContext = useDndEditorContext();
  const [device, setDevice] = useState<DeviceType>('laptop');

  const renderDevice = useMemo(() => {
    if (!props.open) {
      return null;
    }
    const html = exportToHtml(editorContext);
    const parsedHtml = engine.parseAndRenderSync(
      html,
      editorContext.sampleData
    );
    const childComponent = (
      <iframe className={classes.iframe} srcDoc={parsedHtml} />
    );
    switch (device) {
      case 'tablet':
        return (
          <div
            className={clsx(
              'marvel-device',
              'ipad',
              // type === 'dark' ? 'silver' : 'dark'
            )}
          >
            <div className="camera" />
            <div className="screen">{childComponent}</div>
            <div className="home" />
          </div>
        );
      case 'mobile':
        return (
          <div
            className={clsx(
              'marvel-device',
              'iphone5s',
              // type === 'dark' ? 'silver' : 'dark'
            )}
          >
            <div className="top-bar" />
            <div className="sleep" />
            <div className="volume" />
            <div className="camera" />
            <div className="sensor" />
            <div className="speaker" />
            <div className="screen">{childComponent}</div>
            <div className="home" />
            <div className="bottom-bar" />
          </div>
        );
      default:
        return (
          <div className="marvel-device macbook">
            <div className="top-bar" />
            <div className="camera" />
            <div className="screen">{childComponent}</div>
            <div className="bottom-bar" />
          </div>
        );
    }
  }, [props.open, device]);

  const handleChange = (event: MouseEvent<HTMLElement>, newMode: any) => {
    if (newMode) {
      setDevice(newMode);
    }
  };

  const handleClose = () => props.onClose?.({}, 'backdropClick');

  return (
    <Dialog fullScreen {...props}>
      <DialogTitle className={classes.dialogTitle}>
        <Typography variant="h5" color="primary">
          <Trans>Preview</Trans>
        </Typography>
        <ToggleButtonGroup
          value={device}
          exclusive
          size="small"
          className={classes.toggleButtons}
          onChange={handleChange}
        >
          {devices.map((item, i) => (
            <ToggleButton
              className={classes.toggleButton}
              value={item.type}
              key={i}
            >
              <item.icon />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {renderDevice}
      </DialogContent>
      <div className={classes.headerActions}>
        <Tooltip title={<Trans>Close</Trans>}>
          <IconButton onClick={handleClose} size="large">
            <CloseOutlined />
          </IconButton>
        </Tooltip>
      </div>
    </Dialog>
  );
};

export default DndPreviewDialog;
