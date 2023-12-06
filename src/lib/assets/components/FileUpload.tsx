import React, { MouseEvent } from 'react';
import { FormikValues, useFormikContext } from 'formik';
import { PubSub } from '@saastack/pubsub/src/';
import { Trans } from '@lingui/macro';
import {
  Grid,
  FormHelperText,
  FormLabel,
  Link,
  Typography,
} from '@mui/material';
import * as yup from 'yup';
import { DndComponentItem, RenderProps } from '../../types';
import { getComponentState, getFormikProps } from '../../utils';
import Uploader from '../libs/Uploader';

export default {
  render: (renderProps: RenderProps, id: string, formKey: string) => {
    const handleClick = (ev: MouseEvent) => {
      if (renderProps.buildermode) {
        ev.preventDefault();
        PubSub.publish('component/click', { type: 'form-elements', data: id });
      }
    };
    const state = getComponentState(renderProps, id);
    let formikProps: any = {};
    const formik = useFormikContext<FormikValues>();
    if (formik && formKey) {
      formikProps = getFormikProps(formKey, formik, (value) => {
        return {
          text: value,
          valueType: 'String',
        };
      });
      if (Array.isArray(formikProps.value)) {
        formikProps.value = formikProps.value?.[0]?.text;
      } else {
        formikProps.value = formikProps.value?.text;
      }
    }
    return (
      <Grid
        container
        spacing={2}
        style={{ textAlign: 'left', margin: 0, width: '100%' }}
        onClick={handleClick}
      >
        <Grid item xs={12}>
          <FormLabel
            component="label" //made it label, instead of legend because of accessibility
            style={{ marginBottom: 4, display: 'block' }}
            htmlFor={`${renderProps?.item?.id}-${id}`}
          >
            {state?.question}
            <Typography
              color="error"
              style={{ display: 'inline', fontWeight: 'bold' }}
            >
              {state?.required ? ' *' : ''}
            </Typography>
          </FormLabel>
        </Grid>
        <Uploader
          id={`${renderProps?.item?.id}-${id}`}
          accept={state.accept}
          error={formikProps?.helperText?.text}
          {...formikProps}
        />
        <Grid item xs={12}>
          <FormHelperText>{state?.hint}</FormHelperText>
        </Grid>
      </Grid>
    );
  },
  export: () => {
    return '';
  },
  initialValues: {
    question: 'Upload',
    hint: '',
    className: '',
    accept: 'image/*',
    required: false,
    enabled: true,
    itemType: 'File',
  },
  settings: [
    {
      id: 'question',
      type: 'labeledTextInput',
      grid: 12,
      label: <Trans>Question</Trans>,
    },
    {
      id: 'hint',
      type: 'labeledTextInput',
      grid: 12,
      label: <Trans>Hint</Trans>,
    },
    {
      id: 'className',
      type: 'labeledTextInput',
      grid: 12,
      label: <Trans>Class name</Trans>,
    },
    {
      id: 'accept',
      type: 'labeledTextInput',
      grid: 12,
      label: <Trans>Accept</Trans>,
      helperText: (
        <>
          <Link
            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept"
            target="_blank"
          >
            Read more about what patterns work
          </Link>
        </>
      ),
    },
    {
      id: 'required',
      type: 'labeledSwitch',
      grid: 12,
      label: <Trans>Required</Trans>,
    },
    {
      id: 'enabled',
      type: 'labeledSwitch',
      grid: 12,
      label: <Trans>Enabled</Trans>,
    },
  ],
  validationSchema: (renderProps, id, parentSchema) => {
    const state = getComponentState(renderProps, id);
    let schema: any = yup.string();
    schema = state?.required ? schema.required('Required field') : schema;
    if (!state?.required) {
      return yup.object().shape({ text: schema }).nullable();
    }
    return yup.object().shape({ text: schema });
  },
} as DndComponentItem;
