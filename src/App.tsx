import { FC, useState } from 'react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Datepicker } from './lib'
import { ThemeProvider } from '@mui/styles';
import { Theme, StyledEngineProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import { Typography } from '@mui/material'
import StaticDatepicker from './lib/StaticDatepicker'
import defaultTheme from './theme.json'
import { green, purple } from '@mui/material/colors';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}



declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


const App: FC = () => {
    console.log("App")
    const [singleValue, setSingleValue] = useState<string | null>(null)
    const [multipleValue, setMultipleValue] = useState<Array<string | null>>([])
    const [weekValue, setWeekValue] = useState<string | null>(null)
    const [rangeValue, setRangeValue] = useState<[string | null, string | null]>([null, null])

    const theme = createTheme({
        palette: {
          primary: {
            main: purple[500],
          },
          secondary: {
            main: green[500],
          },
        },
        breakpoints: {
            step: 5
        }
      });

    const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000))
    console.log({ theme })

    return (
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <div>
                        <div
                            style={{
                                padding: 64,
                                border: '1px solid #ccc'
                            }}
                        >
                            <Typography gutterBottom variant="h6">
                                Single Datepicker
                            </Typography>
                            <Datepicker
                                onMonthChange={sleep}
                                value={singleValue}
                                onChange={setSingleValue}
                            />
                        </div>
                        <div
                            style={{
                                padding: 64,
                                border: '1px solid #ccc'
                            }}
                        >
                            <Typography gutterBottom variant="h6">
                                Static Single Datepicker
                            </Typography>
                            <StaticDatepicker
                                onMonthChange={sleep}
                                value={singleValue}
                                onChange={setSingleValue}
                            />
                        </div>
                        <div
                            style={{
                                padding: 64,
                                border: '1px solid #ccc'
                            }}
                        >
                            <Typography gutterBottom variant="h6">
                                Multiple Datepicker
                            </Typography>
                            <Datepicker
                                onMonthChange={sleep}
                                mode="multiple"
                                value={multipleValue}
                                onChange={setMultipleValue}
                            />
                        </div>
                        <div
                            style={{
                                padding: 64,
                                border: '1px solid #ccc'
                            }}
                        >
                            <Typography gutterBottom variant="h6">
                                Static Multiple Datepicker
                            </Typography>
                            <StaticDatepicker
                                onMonthChange={sleep}
                                mode="multiple"
                                value={multipleValue}
                                onChange={setMultipleValue}
                            />
                        </div>
                        <div
                            style={{
                                padding: 64,
                                border: '1px solid #ccc'
                            }}
                        >
                            <Typography gutterBottom variant="h6">
                                Static Week Datepicker
                            </Typography>
                            <Datepicker
                                onMonthChange={sleep}
                                mode="week"
                                value={weekValue}
                                onChange={setWeekValue}
                            />
                        </div>
                        <div
                            style={{
                                padding: 64,
                                border: '1px solid #ccc'
                            }}
                        >
                            <Typography gutterBottom variant="h6">
                                Static Week Datepicker
                            </Typography>
                            <StaticDatepicker
                                onMonthChange={sleep}
                                mode="week"
                                value={weekValue}
                                onChange={setWeekValue}
                            />
                        </div>
                        <div
                            style={{
                                padding: 64,
                                border: '1px solid #ccc'
                            }}
                        >
                            <Typography gutterBottom variant="h6">
                                Range Datepicker
                            </Typography>
                            <Datepicker
                                onMonthChange={sleep}
                                mode="range"
                                value={rangeValue}
                                onChange={setRangeValue}
                            />
                        </div>
                        <div
                            style={{
                                padding: 64,
                                border: '1px solid #ccc'
                            }}
                        >
                            <Typography gutterBottom variant="h6">
                                Static Range Datepicker
                            </Typography>
                            <StaticDatepicker
                                onMonthChange={sleep}
                                mode="range"
                                value={rangeValue}
                                onChange={setRangeValue}
                            />
                        </div>
                    </div>
                </LocalizationProvider>
            </ThemeProvider>
    );
}

export default App
