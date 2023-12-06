import { useStore } from '@saastack/rehooks';
import { Button } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ThemeProvider, StylesProvider } from '@mui/styles';
import { Meta } from '@storybook/react';
import React from 'react';
import { DndEditor, Renderer } from '../lib';
import * as Blocks from '../lib/assets/blocks';
import FormElements from '../lib/assets/groups/FormElements';
import * as Templates from '../lib/assets/templates';
import { DndBlockItem, DndState } from '../lib/types';
import { createDndState } from '../lib/utils';

export default {
  title: 'Editor',
  component: DndEditor,
  decorators: [
    (story) => (
      <StylesProvider injectFirst>
        <ThemeProvider
          theme={createTheme({
            typography: { fontFamily: '"Poppins", sans-serif' },
          })}
        >
          {story()}
        </ThemeProvider>
      </StylesProvider>
    ),
  ],
} as Meta;

export const Mail = () => {
  const args = {
    smartyTags: {
      'Customer.FirstName': 'Customer FirstName',
      'Customer.LastName': 'Customer LastName',
      'Customer.Email': 'Customer Email',
      'Customer.Tags': 'Customer Tags',
      'Appointment.ServiceName': 'Appointment ServiceName',
      'Appointment.StaffName': 'Appointment StaffName',
      'Appointment.Time': 'Appointment Time',
      branding: true,
      footer: '<h1>hello</h1>',
    },
    sampleData: {
      Customer: {
        FirstName: 'Anuj',
        LastName: 'Gupta',
        Email: 'anuj@appointy.com',
        Tags: ['new', 'punctual'],
      },
    },
    template: Templates.Mail,
  };
  const [state, setState] = useStore<DndState>('mail-state', createDndState());
  React.useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <DndEditor
      value={state}
      onHtmlChange={console.log}
      // onSendEmail={console.log}
      onChange={setState}
      {...args}
    />
  );
};

export const Form = () => {
  const args = {
    smartyTags: {
      'Appointment.ServiceName': 'Appointment ServiceName',
      branding: true,
      footer: '<h1>hello</h1>',
    },
    items: [
      FormElements,
      Blocks.Divider,
      ...Object.values(Blocks).filter(
        (block: DndBlockItem) => block.parent === 'form-elements'
      ),
    ],
    template: Templates.Form,
  };
  const [state, setState] = useStore<DndState>('form-state', createDndState());
  React.useEffect(() => {
    console.log(state);
  }, [state]);
  return <DndEditor value={state} onChange={setState} {...args} />;
};
export const FormRenderer = () => {
  const [state] = useStore<DndState>('form-state', createDndState());
  const [initialValues, setInitialValues] = useStore('form-initialValues', {});
  React.useEffect(() => {
    console.log(state);
  }, [state]);
  React.useEffect(() => {
    console.log(initialValues);
  }, [initialValues]);
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Button form="asdasdasd" type="submit">
        Submit
      </Button>
      <Renderer
        state={state}
        initialValues={initialValues}
        onChange={setInitialValues}
        formId="asdasdasd"
      />
    </LocalizationProvider>
  );
};
