import { FC, useState } from 'react';
import AdapterMoment from '@material-ui/pickers/adapter/moment';
import { LocalizationProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Datepicker } from './lib';
import StaticDatepicker from './lib/StaticDatepicker';

const App: FC = () => {
  const [singleValue, setSingleValue] = useState<string | null>(null);
  const [multipleValue, setMultipleValue] = useState<Array<string | null>>([]);
  const [weekValue, setWeekValue] = useState<string | null>(null);
  const [rangeValue, setRangeValue] = useState<[string | null, string | null]>([
    null,
    null,
  ]);

  const theme = createMuiTheme();

  const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <div>
          <div
            style={{
              padding: 64,
              border: '1px solid #ccc',
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
              border: '1px solid #ccc',
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
              border: '1px solid #ccc',
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
              border: '1px solid #ccc',
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
              border: '1px solid #ccc',
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
              border: '1px solid #ccc',
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
              border: '1px solid #ccc',
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
              border: '1px solid #ccc',
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
};

export default App;
