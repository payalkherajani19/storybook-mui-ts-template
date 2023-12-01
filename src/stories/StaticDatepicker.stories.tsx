import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { StaticDatepicker, StaticDatepickerProps } from '../lib'
import moment from 'moment-timezone'
import { range, sampleSize } from 'lodash-es'
import { ThemeProvider } from '@mui/styles'
import { Theme } from '@mui/material/styles'
import { green, purple } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import App from '../App'
import dayjs from 'dayjs'

export default {
    title: 'Datepicker/Static',
    component: StaticDatepicker
} as Meta

const Template: StoryFn<StaticDatepickerProps> = (args) => {
    moment.tz.setDefault('America/New_York')
    console.log(args.timezone)
    const [state, setState] = React.useState<any>(args.value)
    const handleMonthChange = (month: string) =>
        new Promise<string[]>((resolve) => {
            setTimeout(() => {
                resolve(
                    sampleSize(range(1, 28), 10).map((date) =>
                        moment(month).set({ date }).format('MM-DD-YYYY')
                    )
                )
            }, 500)
        })

        const theme = createTheme({
            palette: {
              primary: {
                main: purple[500],
              },
              secondary: {
                main: green[500],
              },
            },
          });

        console.log({args})

    return (
        <>
        <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
        {/* <StaticDatepicker
                {...args}
                value={state}
                onChange={setState}
                onMonthChange={handleMonthChange}
            />
            <div>Value - {state}</div> */}
            hello
        </LocalizationProvider>
        </ThemeProvider>       
        </>
    )
}

export const Default = Template.bind({})

Default.args = {
    timezone: 'Asia/Kolkata',
    mode: false,
    value: null
}

export const Multiple = Template.bind({})

Multiple.args = {
    timezone: 'Asia/Kolkata',
    mode: 'multiple',
    value: []
}

export const Range = Template.bind({})

Range.args = {
    timezone: 'Asia/Kolkata',
    mode: 'range',
    value: [null, null]
}

export const Week = Template.bind({})

Week.args = {
    timezone: 'Asia/Kolkata',
    mode: 'week',
    value: null
}
