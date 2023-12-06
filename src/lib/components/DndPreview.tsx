import React, { FC, useState } from 'react';
import { t, Trans } from '@lingui/macro';
import { ButtonBase, Theme, Typography } from '@mui/material';
import { SendOutlined, VisibilityOutlined } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { useDndEditorContext } from '../DndEditorProvider';
import { exportToHtml } from '../utils';
import DndPreviewDialog from './preview/DndPreviewDialog';
import DndSendEmailDialog from './preview/DndSendEmailDialog';
import { Liquid } from 'liquidjs';
import { setupI18n } from '@lingui/core';

const engine = new Liquid();

const useStyles = makeStyles(
  ({
    spacing,
    shape: { borderRadius },
    palette: { background, getContrastText },
  }: Theme) => ({
    actions: {
      display: 'flex',
      alignItems: 'center',
      borderRadius,
      position: 'fixed',
      bottom: spacing(2),
      overflow: 'hidden',
      zIndex: 1,
      right: spacing(41),
    },
    button: {
      backgroundColor: getContrastText(background.default),
      color: background.default,
      padding: spacing(1),
      opacity: 0.5,
      width: spacing(21),
      margin: spacing(0, 1),
      '&:hover': {
        opacity: 0.8,
      },
    },
  })
);

export interface DndPreviewProps {}

const DndPreview: FC<DndPreviewProps> = () => {
  const classes = useStyles();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [sendEmailOpen, setSendEmailOpen] = useState(false);
  const editorContext = useDndEditorContext();
  const { onSendEmail } = editorContext;
  const i18n = setupI18n();

  const validate = () => {
    const html = exportToHtml(editorContext);
    try {
      engine.parse(html);
    } catch (_) {
      window.alert(i18n._(t`Invalid body`));
      return false;
    }

    return true;
  };
  const handlePreview = () => {
    if (validate()) {
      setPreviewOpen(true);
    }
  };
  const handleSendMail = () => {
    if (validate()) {
      setSendEmailOpen(true);
    }
  };

  const handlePreviewClose = () => setPreviewOpen(false);
  const handleSendEmailClose = () => setSendEmailOpen(false);

  return (
    <>
      {previewOpen && (
        <DndPreviewDialog open={previewOpen} onClose={handlePreviewClose} />
      )}
      {sendEmailOpen && (
        <DndSendEmailDialog
          open={sendEmailOpen}
          onClose={handleSendEmailClose}
        />
      )}
      <div className={classes.actions}>
        <ButtonBase onClick={handlePreview} className={classes.button}>
          <VisibilityOutlined fontSize="small" />
          &nbsp;
          <Typography variant="subtitle1">
            <Trans>Preview</Trans>
          </Typography>
        </ButtonBase>
        {onSendEmail && (
          <ButtonBase onClick={handleSendMail} className={classes.button}>
            <SendOutlined fontSize="small" />
            &nbsp;
            <Typography variant="subtitle1">
              <Trans>Send Test Email</Trans>
            </Typography>
          </ButtonBase>
        )}
      </div>
    </>
  );
};

export default DndPreview;
