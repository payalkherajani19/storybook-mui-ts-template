import { MutableRefObject, ReactNode } from 'react';
import { StaticDatePickerProps as MuiDatePickerProps } from '@material-ui/pickers/DatePicker/DatePicker';
import { DialogProps, PaperProps, PopoverProps } from '@mui/material';
import { MuiTextFieldProps } from '@material-ui/pickers/_shared/PureDateInput';
import { DateRangeDayProps } from '@material-ui/pickers/DateRangePicker/DateRangePickerDay';
import { Moment } from 'moment-timezone';
import { DayProps } from '@material-ui/pickers/views/Calendar/Day';

type RemoveKeys =
  | 'onChange'
  | 'value'
  | 'renderInput'
  | 'onMonthChange'
  | 'name';

export interface DatepickerRef {
  handleMonthChange: (date?: Moment) => Promise<string[] | undefined>;
  clear: () => void;
}

export interface BaseDatepickerProps
  extends Partial<Omit<MuiDatePickerProps, RemoveKeys>> {
  startDate?: string | null;
  dateFormat?: string;
  timezone?: string;
  markedDates?: string[];
  utc?: boolean;
  onMonthChange?: (
    date: string
  ) =>
    | void
    | null
    | undefined
    | string[]
    | unknown
    | Promise<string[] | void | undefined | null | unknown>;
  size?: 'small' | 'medium' | 'large';
  DayComponentProps?: DayProps<Moment> | DateRangeDayProps<Moment>;
  LoadingOverlayComponent?: ReactNode;
  classes?: {
    date?: string;
    selected?: string;
    marked?: string;
    selectedMarked?: string;
  };
  renderInput?: MuiDatePickerProps['renderInput'];
  datepickerRef?: MutableRefObject<DatepickerRef>;
  shouldStrikeOutDate?: (d: string) => boolean;
  shouldStrikeOutDateClassName?: string;
}

export interface SingleDatePickerProps extends BaseDatepickerProps {
  multiple?: false;
  mode?: false;
  value?: string | null;
  onChange?: (value: string | null) => void;
}

export interface MultipleDatePickerProps extends BaseDatepickerProps {
  multiple?: true;
  mode?: 'multiple';
  value?: Array<string | null>;
  onChange?: (value: Array<string | null>) => void;
}

export interface RangeDatePickerProps extends BaseDatepickerProps {
  multiple?: false;
  mode?: 'range';
  calendars?: number;
  value?: [string | null, string | null];
  onChange?: (value: [string | null, string | null]) => void;
}

export interface WeekDatePickerProps extends BaseDatepickerProps {
  multiple?: false;
  mode?: 'week';
  value?: string | null;
  onChange?: (value: string | null) => void;
}

export type StaticDatepickerProps =
  | SingleDatePickerProps
  | MultipleDatePickerProps
  | RangeDatePickerProps
  | WeekDatePickerProps;

export type DatepickerProps = StaticDatepickerProps & {
  disableResponsive?: boolean;
  placeholder?: string;
  open?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  clearable?: boolean;
  TextFieldProps?: MuiTextFieldProps;
  DialogProps?: Partial<Omit<DialogProps, 'open' | 'onClose'>>;
  PopoverProps?: Partial<Omit<PopoverProps, 'open' | 'onClose'>>;
  PaperProps?: Partial<PaperProps>;
};
