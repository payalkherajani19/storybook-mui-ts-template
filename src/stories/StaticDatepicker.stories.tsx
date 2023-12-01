import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import moment from 'moment-timezone';
import { range, sampleSize } from 'lodash-es';
import { StaticDatepicker, StaticDatepickerProps } from '../lib';

export default {
  title: 'Datepicker/Static',
  component: StaticDatepicker,
} as Meta;

const Template: StoryFn<StaticDatepickerProps> = (args) => {
  moment.tz.setDefault('America/New_York');
  console.log(args.timezone);
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
      <StaticDatepicker
        {...args}
        value={state}
        onChange={setState}
        onMonthChange={handleMonthChange}
      />
      <div>Value - {state}</div>
    </>
  );
};

export const Default = Template.bind({});

Default.args = {
  timezone: 'Asia/Kolkata',
  mode: 'single',
  placeholder: 'Single Datepicker',
  value: null,
};

export const Multiple = Template.bind({});

Multiple.args = {
  timezone: 'Asia/Kolkata',
  mode: 'multiple',
  placeholder: 'Multiple Datepicker',
  value: [],
};

export const Range = Template.bind({});

Range.args = {
  timezone: 'Asia/Kolkata',
  mode: 'range',
  placeholder: 'Range Datepicker',
  value: [null, null],
};

export const Week = Template.bind({});

Week.args = {
  timezone: 'Asia/Kolkata',
  mode: 'week',
  placeholder: 'Week Datepicker',
  value: null,
};
