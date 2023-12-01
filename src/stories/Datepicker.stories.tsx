import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import moment from 'moment-timezone';
import { range, sampleSize } from 'lodash-es';
import { Datepicker, DatepickerProps } from '../lib';

export default {
  title: 'Datepicker/Popover',
  component: Datepicker,
} as Meta;

const Template: StoryFn<DatepickerProps> = (args) => {
  if (args.timezone) {
    moment.tz.setDefault(args.timezone);
  }
  const [state, setState] = React.useState<any>(args.value);
  const handleMonthChange = (month: string) =>
    new Promise<string[]>((resolve) => {
      setTimeout(() => {
        resolve(
          sampleSize(range(1, 28), 10).map((date) =>
            moment(month).set({ date }).format('MM-DD-YYYY')
          )
        );
      }, 500);
    });
  return (
    <>
      <Datepicker
        {...args}
        value={state}
        onChange={setState}
        onMonthChange={handleMonthChange}
        disabled
      />
      <div>Value - {state}</div>
    </>
  );
};

export const Default = Template.bind({ timezone: 'America/New_York' });

Default.args = {
  mode: 'single',
  placeholder: 'Single Datepicker',
  value: null,
};

export const Multiple = Template.bind({});

Multiple.args = {
  mode: 'multiple',
  placeholder: 'Multiple Datepicker',
  value: [],
};

export const Range = Template.bind({});

Range.args = {
  mode: 'range',
  placeholder: 'Range Datepicker',
  value: [null, null],
};

export const Week = Template.bind({});

Week.args = {
  mode: 'week',
  placeholder: 'Week Datepicker',
  value: null,
};
