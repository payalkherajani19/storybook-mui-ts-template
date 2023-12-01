import { useCallback, useMemo, useState } from 'react';
import { useUtils } from '@material-ui/pickers';
import { DateRangeDayProps } from '@material-ui/pickers/DateRangePicker/DateRangePickerDay';
import { coerceArray } from './utils';

const useWeekUtils = <TDate>(
  mode: 'week' | 'range' | 'multiple' | false,
  date: TDate | TDate[] | null
) => {
  const selectedDate = useMemo(() => coerceArray(date)[0], [date]);
  const utils = useUtils<TDate>();
  const [weekPreviewDay, setWeekPreviewDay] = useState<TDate | null>(null);

  const weekPreviewRange = useMemo<[TDate, TDate]>(
    () => [
      weekPreviewDay ? utils.startOfWeek(weekPreviewDay) : null,
      weekPreviewDay ? utils.endOfWeek(weekPreviewDay) : null,
    ],
    [utils, weekPreviewDay]
  );
  const weekSelectedRange = useMemo<[TDate, TDate]>(
    () => [
      selectedDate ? utils.startOfWeek(selectedDate) : null,
      selectedDate ? utils.endOfWeek(selectedDate) : null,
    ],
    [utils, selectedDate]
  );

  const isWithinRange = useCallback(
    (newDate: TDate, range: [TDate, TDate]) =>
      newDate && range.filter(Boolean).length
        ? utils.isWithinRange(newDate, range)
        : false,
    [utils]
  );

  const handlePreviewDayChange = (newPreviewRequest: TDate) => {
    if (!isWithinRange(newPreviewRequest, weekPreviewRange)) {
      setWeekPreviewDay(newPreviewRequest);
    }
  };

  const getDayProps = (day: TDate): DateRangeDayProps<TDate> | {} => {
    if (mode === 'week') {
      return {
        isPreviewing: isWithinRange(day, weekPreviewRange),
        isHighlighting: isWithinRange(day, weekSelectedRange),
        onMouseEnter: () => handlePreviewDayChange(day),
      };
    }
    return {};
  };

  const TransitionProps = useMemo(
    () => ({
      onMouseLeave: () => setWeekPreviewDay(null),
    }),
    []
  );

  const getDatepickerProps = () => {
    if (mode === 'week') {
      return { TransitionProps };
    }
    return {};
  };

  return { getDayProps, getDatepickerProps };
};

export default useWeekUtils;
