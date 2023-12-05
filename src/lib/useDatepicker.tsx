import {
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, Theme } from '@mui/material';
import { StaticDatePickerProps  as MuiDatePickerProps } from '@mui/x-date-pickers';
import { StaticDateRangePickerProps as MuiDateRangePickerProps } from '@mui/x-date-pickers-pro';
import { PickersDay as Day } from '@mui/x-date-pickers/PickersDay';
import moment, { Moment } from 'moment-timezone';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro';
import { debounce, xor } from 'lodash-es';
import { MuiTextFieldProps } from '@mui/x-date-pickers/internals/components/PureDateInput';
import { PickersDayProps as DayProps } from '@mui/x-date-pickers/PickersDay';
import clsx from 'clsx';
import { DateRangeDayProps } from './DateRangeDay';
import { StaticDatepickerProps } from './types';
import { DateRangeDay } from './DateRangeDay';
import useWeekUtils from './useWeekUtils';
import { coerceArray } from './utils';
import Loading from './Loading';
import { useUtils } from '@mui/x-date-pickers/internals/hooks/useUtils';

const DATEPICKER_LARGE_WIDTH = 348;
const DATEPICKER_LARGE_HEIGHT = 232;

const DATEPICKER_MEDIUM_WIDTH = 288;
const DATEPICKER_MEDIUM_HEIGHT = 244;

const DATEPICKER_SMALL_WIDTH = 220;
const DATEPICKER_SMALL_HEIGHT = 196;

const useStyles = makeStyles(
  ({ spacing, palette: { primary, background, error } }: Theme) => ({
    date: {
      position: 'relative',
    },
    marked: {
      '&:after': {
        content: '""',
        width: 4,
        height: 4,
        display: 'inline-block',
        position: 'absolute',
        bottom: 2,
        left: '50%',
        transform: 'translateX(-50%)',
        borderRadius: 4,
        backgroundColor: primary.main,
      },
      '&.Mui-selected, &.MuiPickersDateRangeDay-dayInsideRangeInterval, &$selectedMarked':
        {
          '&:after': {
            backgroundColor: background.default,
          },
        },
    },
    selectedMarked: {},
    root: {
      '& .MuiPickersCalendar-weekDayLabel': {
        margin: 0,
      },
      '& .MuiPickersArrowSwitcher-previousMonthButtonMargin': {
        marginRight: spacing(1.5),
      },
      '& .MuiPickersYear-root': {
        flexBasis: '25%',
      },
    },
    small: {
      '& .MuiPickersBasePicker-pickerView, & .MuiPickersMonthSelection-root': {
        width: DATEPICKER_SMALL_WIDTH,
      },
      '& .MuiPickersStaticWrapper-root': {
        minWidth: DATEPICKER_SMALL_WIDTH,
      },
      '& .MuiPickersCalendar-root': {
        minHeight: DATEPICKER_SMALL_HEIGHT,
      },
      '& .MuiPickersBasePicker-pickerView': {
        maxHeight: DATEPICKER_SMALL_HEIGHT + 44 + 54,
      },
      '& .MuiPickersCalendarHeader-root': {
        paddingLeft: spacing(2.5),
        paddingRight: spacing(1.5),
      },
      '& .MuiSvgIcon-root': {
        width: '0.8em',
        height: '0.8em',
      },
      '& .MuiPickersCalendarHeader-yearSelectionSwitcher': {
        height: 23,
        marginRight: 'auto',
      },
      '& .MuiPickersDay-root, & .MuiPickersCalendar-weekDayLabel': {
        width: spacing(3.5),
        height: spacing(3.5),
      },
      '& .MuiPickersDateRangeDay-rangeIntervalPreview .MuiPickersDay-root': {
        width: `${spacing(3.5)} - 4`,
        height: `${spacing(3.5)} - 4`,
      },
      '& .MuiPickersYear-yearButton': {
        width: 48,
      },
      '& .MuiPickersMonth-root': {
        height: 48,
      },
      '& .MuiTypography-root, & .MuiPickersDay-root, & .MuiPickersMonth-root, & .MuiPickersYear-yearButton, & .MuiTypography-root':
        {
          fontSize: '0.8rem',
        },
      '& .MuiPickersYearSelection-root': {
        margin: `0 10px`,
      },
    },
    medium: {
      '& .MuiPickersBasePicker-pickerView, & .MuiPickersMonthSelection-root': {
        width: DATEPICKER_MEDIUM_WIDTH,
      },
      '& .MuiPickersStaticWrapper-root': {
        minWidth: DATEPICKER_MEDIUM_WIDTH,
      },
      '& .MuiPickersCalendar-root': {
        minHeight: DATEPICKER_MEDIUM_HEIGHT,
      },
      '& .MuiPickersBasePicker-pickerView': {
        maxHeight: DATEPICKER_MEDIUM_HEIGHT + 44 + 54,
      },
      '& .MuiPickersYear-yearButton': {
        width: 68,
      },
      '& .MuiPickersMonth-root': {
        fontSize: '1.2rem',
      },
      '& .MuiPickersDay-root, & .MuiPickersCalendar-weekDayLabel': {
        width: spacing(4.5),
        height: spacing(4.5),
      },
      '& .MuiPickersDateRangeDay-rangeIntervalPreview .MuiPickersDay-root': {
        width: `${spacing(4.5)} - 4`,
        height: `${spacing(4.5)} - 4`,
      },
    },
    large: {
      '& .MuiPickersBasePicker-pickerView, & .MuiPickersMonthSelection-root': {
        width: DATEPICKER_LARGE_WIDTH,
      },
      '& .MuiPickersStaticWrapper-root': {
        minWidth: DATEPICKER_LARGE_WIDTH,
      },
      '& .MuiPickersCalendar-root': {
        minHeight: DATEPICKER_LARGE_HEIGHT,
      },
      '& .MuiPickersBasePicker-pickerView': {
        maxHeight: DATEPICKER_LARGE_HEIGHT + 44 + 54,
      },
      '& .MuiPickersDesktopDateRangeCalendar-calendar': {
        minWidth: DATEPICKER_LARGE_WIDTH,
      },
      '& .MuiPickersYear-yearButton': {
        width: 80,
      },
      '& .MuiPickersDay-root, & .MuiPickersCalendar-weekDayLabel': {
        width: spacing(5.5),
        height: spacing(5.5),
      },
      '& .MuiPickersDateRangeDay-rangeIntervalPreview .MuiPickersDay-root': {
        width: `${spacing(5.5)} - 4`,
        height: `${spacing(5.5)} - 4`,
      },

      '& .MuiPickersCalendarHeader-root': {
        paddingLeft: spacing(3.5),
        paddingRight: spacing(2.5),
      },
      '& .MuiSvgIcon-root': {
        width: '1.1em',
        height: '1.1em',
      },
      '& .MuiTypography-root, & .MuiPickersDay-root, & .MuiPickersMonth-root, & .MuiPickersYear-yearButton, & .MuiTypography-root':
        {
          fontSize: '1.1rem',
        },
      '& .MuiPickersCalendarHeader-yearSelectionSwitcher': {
        height: 32,
        marginRight: 'auto',
      },
      '& .MuiPickersYearSelection-root': {
        margin: `0 8px`,
      },
    },
    positionRelative: {
      position: 'relative',
    },
    strikeOutDate: {
      opacity: 0.54,
      color: `${error.dark}!important`,
      borderColor: `${error.dark}!important`,
      textDecoration: 'line-through',
    },
  })
);

const defaultRenderInput = (params1: MuiTextFieldProps) => (
  //@ts-ignore
  <TextField {...params1}  /> 
);

const scrollIntoView = debounce((el: HTMLDivElement) => {
  const yearEl = el.querySelector('.MuiPickersYear-yearButton.Mui-selected');
  if (yearEl) {
    yearEl.scrollIntoView({ inline: 'center', block: 'center' });
  }
}, 100);

const useDatepicker = (
  props: StaticDatepickerProps
): {
  datepickerProps: MuiDatePickerProps<Date, Date> | MuiDateRangePickerProps<Date, Date>;
  Component: ReactNode;
  LoadingOverlayComponent: ReactNode;
  textValue: string;
  clear: () => void;
  allProps: StaticDatepickerProps;
  handleMonthChange: (date?: Moment) => Promise<string[]>;
} => {
  const containerRef = useRef<HTMLDivElement>() as RefObject<HTMLDivElement>;
  const isMountedRef = useRef(true);
  const classes = useStyles();
  const clonedProps: StaticDatepickerProps = { ...props };
  const [markedDates, setMarkedDates] = useState(clonedProps.markedDates ?? []);
  const [loading, setLoading] = useState(false);
  const utils = useUtils<Moment>();

  if (clonedProps.multiple) {
    clonedProps.mode = 'multiple';
  }
  if (clonedProps.utc) {
    clonedProps.timezone = 'UTC';
  }
  if (clonedProps.dateFormat) {
    clonedProps.inputFormat = clonedProps.dateFormat;
  }

  useEffect(() => {
    setMarkedDates(clonedProps.markedDates);
  }, [clonedProps.markedDates]);

  const {
    startDate: _startDate,
    dateFormat,
    timezone = (moment as any).defaultZone?.name || moment.tz.guess(true),
    markedDates: _,
    utc,
    multiple,
    mode,
    onMonthChange,
    size = 'medium',
    DayComponentProps,
    classes: propClasses = {},
    LoadingOverlayComponent,
    shouldStrikeOutDate,
    shouldStrikeOutDateClassName,
    ...rest
  } = clonedProps;

  const selectedDates: Moment[] = useMemo(
    () =>
      coerceArray(clonedProps.value)
        .filter(Boolean)
        .map((date: string) => utils.startOfDay(moment.tz(date, timezone)))
        .filter((date) => date.toISOString() !== '0001-01-01T00:00:00Z'),
    [clonedProps.value, timezone]
  );

  const startDate = useMemo(() => {
    let sd = _startDate ?? utils.startOfDay(moment.tz(timezone)).toISOString();

    if (clonedProps.minDate && !selectedDates.length) {
      const minMomentDate = utils.startOfDay(
        moment.tz(clonedProps.minDate, timezone)
      );
      if (minMomentDate.isAfter(sd)) {
        sd = minMomentDate.toISOString();
      }
    }

    if (clonedProps.maxDate && !selectedDates.length) {
      const maxMomentDate = utils.startOfDay(
        moment.tz(clonedProps.maxDate, timezone)
      );
      if (maxMomentDate.isBefore(sd)) {
        sd = maxMomentDate.toISOString();
      }
    }

    return sd;
  }, [_startDate, clonedProps.minDate, clonedProps.maxDate, timezone, utils]);

  const formattedDates = useMemo(
    () => selectedDates.map((date) => date.format(dateFormat)),
    [selectedDates, timezone]
  );

  const clear = useCallback(() => {
    switch (clonedProps.mode) {
      case 'range':
        clonedProps.onChange?.([null, null]);
        break;
      case 'multiple':
        clonedProps.onChange?.([]);
        break;
      default:
        clonedProps.onChange?.('');
    }
  }, [clonedProps.mode, clonedProps.onChange]);

  const { datepickerValue, textValue } = useMemo(() => {
    switch (clonedProps.mode) {
      case 'range':
        return {
          datepickerValue: selectedDates,
          textValue: formattedDates.join(' - '),
        };
      case 'week':
        const value = selectedDates[0];
        return {
          datepickerValue: value,
          textValue: value
            ? [
                utils.startOfWeek(value).format(dateFormat),
                utils.endOfWeek(value).format(dateFormat),
              ].join(' - ')
            : '',
        };
      case 'multiple':
        return {
          datepickerValue: selectedDates[0],
          textValue: formattedDates.join(' · '),
        };
      default:
        return {
          datepickerValue: selectedDates[0],
          textValue: formattedDates[0] ?? '',
        };
    }
  }, [selectedDates, clonedProps.mode, formattedDates]);

  const weekUtils = useWeekUtils<Moment>(mode, datepickerValue);

  const handleMonthChange = useCallback(
    async (date?: Moment): Promise<string[] | undefined> => {
      let dates: string[] | undefined;
      if (onMonthChange) {
        setLoading(true);
        const dpValue = coerceArray(datepickerValue)[0];
        const isoDate = date
          ? date.toISOString()
          : dpValue
            ? dpValue.toISOString()
            : startDate
              ? moment(startDate).toISOString()
              : moment().toISOString();
        try {
          const newDates = await onMonthChange?.(isoDate);
          if (newDates && Array.isArray(newDates)) {
            dates = newDates;
          }
          if (isMountedRef.current && dates) {
            setMarkedDates(dates);
          }
        } catch (e) {}
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
      return dates;
    },
    [
      onMonthChange,
      startDate,
      datepickerValue,
      isMountedRef.current,
      setLoading,
      setMarkedDates,
    ]
  );

  useEffect(
    () => () => {
      setLoading(false);
      isMountedRef.current = false;
    },
    []
  );

  useEffect(() => {
    if (containerRef.current) {
      const config: MutationObserverInit = { childList: true, subtree: true };
      const callback: MutationCallback = () => {
        scrollIntoView(containerRef.current);
      };
      const observer = new MutationObserver(callback);
      observer.observe(containerRef.current, config);
      return () => {
        observer.disconnect();
      };
    }
    return () => {};
  }, [containerRef.current]);

  const handleChange = useCallback(
    (_: unknown) => {
      let value: any;
      switch (mode) {
        case 'multiple':
          const date = _ as Moment;
          value = xor(
            selectedDates.map((date) => date.toISOString()),
            date
              ? [utils.startOfDay(moment.tz(date, timezone)).toISOString()]
              : []
          );
          clonedProps.onChange?.(value);
          break;
        case 'range':
          const dates = _ as Moment[];
          if (dates.filter(Boolean).length === 2) {
            value = dates.map((date) =>
              utils.startOfDay(moment.tz(date, timezone)).toISOString()
            );
            clonedProps.onChange?.(value);
          }
          break;
        default:
          const singleDate = _ as Moment;
          value = singleDate
            ? utils.startOfDay(moment.tz(singleDate, timezone)).toISOString()
            : null;
          clonedProps.onChange?.(value);
      }
    },
    [clonedProps.onChange, utils, selectedDates, timezone, mode]
  );

  const formattedDatesMMDDYYYY = useMemo(
    () => selectedDates.map((date) => date.format('MM-DD-YYYY')),
    [selectedDates, timezone]
  );

  const renderDay = useCallback(
    (
      day: Moment,
      selectedDatesOrDateRangeDayProps: Moment[] | DateRangeDayProps<Moment>,
      dayComponentProps: DayProps<Moment>
    ): JSX.Element => {
      const dayString = day?.format('MM-DD-YYYY');
      const datepickerDate = day?.format('YYYY-MM-DD');

      const inCurrentMonth = dayComponentProps
        ? !dayComponentProps.outsideCurrentMonth
        : !(selectedDatesOrDateRangeDayProps as DateRangeDayProps<Moment>)
            .outsideCurrentMonth;
      const isSelected =
        inCurrentMonth &&
        dayString &&
        formattedDatesMMDDYYYY.includes(dayString);
      const isMarked =
        inCurrentMonth &&
        dayString &&
        markedDates?.includes(dayString) &&
        (mode === 'range' || mode === 'week' ? inCurrentMonth : true);

      const commonProps = {
        disableMargin: true,
        ...DayComponentProps,
        className: clsx(DayComponentProps?.className, classes.date, {
          [propClasses?.date]: Boolean(propClasses?.date),
          [propClasses?.selected]: Boolean(propClasses?.selected) && isSelected,
          [classes.marked]: isMarked,
          [classes.selectedMarked]: isSelected && isMarked,
          [propClasses?.marked]: Boolean(propClasses?.marked) && isMarked,
          [propClasses?.selectedMarked]:
            Boolean(propClasses?.selectedMarked) && isSelected && isMarked,
          [shouldStrikeOutDateClassName || classes?.strikeOutDate]:
            shouldStrikeOutDate && shouldStrikeOutDate(datepickerDate),
        }),
      };

      switch (mode) {
        case 'range':
          return (
            <DateRangeDay<Moment>
              {...(selectedDatesOrDateRangeDayProps as DateRangeDayProps<Moment>)}
              {...commonProps}
            />
          );
        case 'week':
          const weekRangeProps: DateRangeDayProps<Moment> = {
            ...dayComponentProps,
            ...weekUtils.getDayProps(day),
          } as any;
          return <DateRangeDay<Moment> {...weekRangeProps} {...commonProps} />;
        case 'multiple':
          return (
            <Day<Moment>
              {...dayComponentProps}
              selected={isSelected}
              {...commonProps}
            />
          );
        default:
          return <Day<Moment> {...dayComponentProps} {...commonProps} />;
      }
    },
    [
      mode,
      formattedDatesMMDDYYYY,
      classes,
      propClasses,
      DayComponentProps,
      weekUtils,
    ]
  );

  const datepickerProps: MuiDatePickerProps<Date, Date> | MuiDateRangePickerProps<Date, Date> = {
    calendars: 2,
    renderDay,
    renderInput: defaultRenderInput,
    disableCloseOnSelect: clonedProps.mode === 'multiple',
    ...weekUtils.getDatepickerProps(),
    ...rest,
    loading: false,
    renderLoading: () => null,
    onMonthChange: handleMonthChange,
    value: datepickerValue || startDate || null,
    onChange: handleChange,
  } as any;

  let Component;

  if (clonedProps.mode === 'range') {
    Component = (
      <div className={clsx(classes.root, { [classes[size]]: true })}>
        <StaticDateRangePicker
          {...(datepickerProps as MuiDateRangePickerProps<Date, Date>)}
          displayStaticWrapperAs="desktop"
        />
      </div>
    );
  } else {
    Component = (
      <div
        ref={containerRef}
        className={clsx(classes.root, { [classes[size]]: true })}
      >
        <StaticDatePicker {...(datepickerProps as MuiDatePickerProps<Date, Date>)} />
      </div>
    );
  }

  const _LoadingOverlayComponent =
    rest.loading || loading ? LoadingOverlayComponent || <Loading /> : null;

  useEffect(() => {
    if (props.datepickerRef) {
      props.datepickerRef.current = {
        handleMonthChange,
        clear,
      };
    }
  }, [props.datepickerRef, handleMonthChange, clear]);

  return {
    handleMonthChange,
    datepickerProps,
    Component,
    textValue,
    clear,
    allProps: clonedProps,
    LoadingOverlayComponent: _LoadingOverlayComponent,
  };
};

export default useDatepicker;
