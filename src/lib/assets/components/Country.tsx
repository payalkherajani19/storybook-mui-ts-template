import React, { MouseEvent, ChangeEvent } from 'react';
import { PubSub } from '@saastack/pubsub/';
import { Trans } from '@lingui/macro';
import { FormLabel, TextField, Typography } from '@mui/material';
import Autocomplete, {
  AutocompleteRenderInputParams,
} from '@mui/material/Autocomplete';
import * as yup from 'yup';
import { DndComponentItem, RenderProps } from '../../types';
import { FormikValues, useFormikContext } from 'formik';
import { getFormikProps, getComponentState, useCountries } from '../../utils';
import { noop } from 'lodash-es';

export default {
  render: (renderProps: RenderProps, id: string, formKey: string) => {
    const handleClick = (ev: MouseEvent) => {
      ev.preventDefault();
      PubSub.publish('component/click', { type: 'form-elements', data: id });
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
      formikProps.helperText = formikProps.helperText?.text || state?.hint;
      if (Array.isArray(formikProps.value)) {
        formik.setFieldValue(formKey, formikProps.value[0]);
      }
      formikProps.value = formikProps.value?.text;
    }
    const onChange = (event: ChangeEvent<{}>) => {
      const value = (event.target as any).textContent;
      formik.setFieldValue(formKey, { text: value, valueType: 'String' });
    };
    const textField = (props: AutocompleteRenderInputParams) => (
      <>
        <FormLabel
          component="label" // made it label, instead of legend because of accessibility
          style={{ marginBottom: 4, display: 'block' }}
          htmlFor={`${renderProps?.item?.id}-${id}`}
        >
          <Trans>Country</Trans>
          <Typography
            color="error"
            style={{ display: 'inline', fontWeight: 'bold' }}
          >
            {state?.required ? ' *' : ''}
          </Typography>
        </FormLabel>
        <TextField
          {...props}
          size="small"
          id={`${renderProps?.item?.id}-${id}`}
          type={state?.inputType || 'text'}
          variant="outlined"
          fullWidth
          value={state?.defaultValue}
          inputProps={{ id: `${renderProps?.item?.id}-${id}` }}
          {...formikProps}
          onChange={noop}
        />
      </>
    );
    const options = useCountries();
    return (
      <div onClick={handleClick}>
        <Autocomplete
          options={options}
          renderInput={textField}
          onChange={onChange}
        />
      </div>
    );
  },
  export: () => {
    return '';
  },
  initialValues: {
    className: '',
    required: false,
    enabled: true,
    grid: 12,
    itemType: 'Input',
    inputType: 'country',
    style: {
      textAlign: 'left',
    },
  },
  settings: [
    {
      id: 'className',
      type: 'labeledTextInput',
      grid: 12,
      label: <Trans>Class name</Trans>,
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
  validationSchema: (renderProps: RenderProps, id: string, parentSchema) => {
    const state = getComponentState(renderProps, id);
    let schema = parentSchema || yup.string();
    schema = state?.required ? schema.required('Required field') : schema;
    return yup.object().shape({ text: schema });
  },
} as DndComponentItem;
