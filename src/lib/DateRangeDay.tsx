import { ReactElement, memo } from 'react';
import clsx from 'clsx';
import { alpha, Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { PickersDay as Day } from '@mui/x-date-pickers/PickersDay';
import { useUtils } from '@mui/x-date-pickers/internals/hooks/useUtils';
// eslint-disable-next-line import/no-unresolved
import { PickersDayProps as DayProps } from '@mui/x-date-pickers/PickersDay';
import { isEqual } from 'lodash-es';

export interface DateRangeDayProps<TDate> extends DayProps<TDate> {
  isHighlighting: boolean;
  isEndOfHighlighting: boolean;
  isStartOfHighlighting: boolean;
  isPreviewing: boolean;
  isEndOfPreviewing: boolean;
  isStartOfPreviewing: boolean;
}

const endBorderStyle = {
  borderTopRightRadius: '50%',
  borderBottomRightRadius: '50%',
};

const startBorderStyle = {
  borderTopLeftRadius: '50%',
  borderBottomLeftRadius: '50%',
};

const useStyles = makeStyles(
  ({ palette: { divider, primary, grey, getContrastText } }: Theme) => ({
    root: {
      '&:first-child $rangeIntervalDayPreview': {
        ...startBorderStyle,
        borderLeftColor: divider,
      },
      '&:last-child $rangeIntervalDayPreview': {
        ...endBorderStyle,
        borderRightColor: divider,
      },
    },
    rangeIntervalDayHighlight: {
      borderRadius: 0,
      color: primary.contrastText,
      backgroundColor: alpha(primary.light, 0.6),
      '&:first-child': startBorderStyle,
      '&:last-child': endBorderStyle,
    },
    rangeIntervalDayHighlightStart: {
      ...startBorderStyle,
      paddingLeft: 0,
      marginLeft: 1,
    },
    rangeIntervalDayHighlightEnd: {
      ...endBorderStyle,
      paddingRight: 0,
      marginRight: 1,
    },
    day: {
      // Required to overlap preview border
      transform: 'scale(1.1)',
      '& > *': {
        transform: 'scale(0.9)',
      },
    },
    dayOutsideRangeInterval: {
      '&:hover': {
        border: `1px solid ${grey[500]}`,
      },
    },
    dayInsideRangeInterval: {
      color: getContrastText(alpha(primary.light, 0.6)),
    },
    notSelectedDate: {
      backgroundColor: 'transparent',
    },
    rangeIntervalPreview: {
      // replace default day component margin with transparent border to avoid jumping on preview
      border: '2px solid transparent',
    },
    rangeIntervalDayPreview: {
      borderRadius: 0,
      border: `2px dashed ${divider}`,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',

      '&$rangeIntervalDayPreviewStart': {
        borderLeftColor: divider,
        ...startBorderStyle,
      },
      '&$rangeIntervalDayPreviewEnd': {
        borderRightColor: divider,
        ...endBorderStyle,
      },
    },
    rangeIntervalDayPreviewStart: {},
    rangeIntervalDayPreviewEnd: {},
  }),
  { name: 'MuiPickersDateRangeDay' }
);

const PureDateRangeDay = <TDate extends any>(
  props: DateRangeDayProps<TDate>
): ReactElement => {
  const {
    className,
    day,
    outsideCurrentMonth,
    isEndOfHighlighting,
    isEndOfPreviewing,
    isHighlighting,
    isPreviewing,
    isStartOfHighlighting,
    isStartOfPreviewing,
    selected,
    ...other
  } = props;
  const utils = useUtils();
  const classes = useStyles();

  const isEndOfMonth = utils.isSameDay(day, utils.endOfMonth(day));
  const isStartOfMonth = utils.isSameDay(day, utils.startOfMonth(day));

  const shouldRenderHighlight = isHighlighting && !outsideCurrentMonth;
  const shouldRenderPreview = isPreviewing && !outsideCurrentMonth;
  // console.log({ shouldRenderHighlight, shouldRenderPreview})

  return (
    <div
      data-mui-test={shouldRenderHighlight ? 'DateRangeHighlight' : undefined}
      className={clsx(classes.root, {
        [classes.rangeIntervalDayHighlight]: shouldRenderHighlight,
        [classes.rangeIntervalDayHighlightEnd]:
          isEndOfHighlighting || isEndOfMonth,
        [classes.rangeIntervalDayHighlightStart]:
          isStartOfHighlighting || isStartOfMonth,
      })}
    >
      <div
        data-mui-test={shouldRenderPreview ? 'DateRangePreview' : undefined}
        className={clsx(classes.rangeIntervalPreview, {
          [classes.rangeIntervalDayPreview]: shouldRenderPreview,
          [classes.rangeIntervalDayPreviewEnd]:
            isEndOfPreviewing || isEndOfMonth,
          [classes.rangeIntervalDayPreviewStart]:
            isStartOfPreviewing || isStartOfMonth,
        })}
      >
        <Day<TDate>
          {...other}
          disableMargin
          day={day}
          selected={selected}
          outsideCurrentMonth={outsideCurrentMonth}
          data-mui-test="DateRangeDay"
          className={clsx(
            classes.day,
            {
              [classes.notSelectedDate]: !selected,
              [classes.dayOutsideRangeInterval]: !isHighlighting,
              [classes.dayInsideRangeInterval]: !selected && isHighlighting,
            },
            className
          )}
        />
      </div>
    </div>

  );
};

export const DateRangeDay = memo(
  PureDateRangeDay,
  (prevProps, nextProps) =>
    prevProps.isHighlighting === nextProps.isHighlighting &&
    prevProps.isEndOfHighlighting === nextProps.isEndOfHighlighting &&
    prevProps.isStartOfHighlighting === nextProps.isStartOfHighlighting &&
    prevProps.isPreviewing === nextProps.isPreviewing &&
    prevProps.isEndOfPreviewing === nextProps.isEndOfPreviewing &&
    prevProps.isStartOfPreviewing === nextProps.isStartOfPreviewing &&
    isEqual(prevProps, nextProps)
) as typeof PureDateRangeDay;