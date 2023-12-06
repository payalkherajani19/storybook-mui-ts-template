import React, {
  FC,
  ComponentType,
  ReactNode,
  useMemo,
  MouseEvent,
} from 'react';
import { SvgIconProps, Theme } from '@mui/material';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ToggleButtonGroupProps } from '@mui/lab/ToggleButtonGroup/ToggleButtonGroup';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(
  ({
    palette: { primary, divider, action },
    spacing,
    shape: { borderRadius },
  }: Theme) => ({
    root: {
      height: 32,
      flex: 1,
      padding: spacing(0.75, 1),
      borderRadius: `${borderRadius}px !important`,
      fontSize: 12,
      textTransform: 'none',
      fontWeight: 500,
      '&:not(:last-child)': {
        marginRight: spacing(1),
      },
      '&:not(:first-child)': {
        marginLeft: 0,
        borderLeftColor: divider,
      },
      '&:hover': {
        backgroundColor: action.hover,
      },
    },
    selected: {
      '&.Mui-selected': {
        borderColor: `${primary.main}!important`,
        color: primary.main,
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: action.hover,
        },
      },
    },
    container: {
      display: 'flex',
    },
    icon: {
      fontSize: 24,
    },
  })
);

export type ToggleButtonOption = {
  icon?: ComponentType<SvgIconProps>;
  label?: ReactNode;
  id: string | number;
};

export interface StyledToggleButtonsProps
  extends Omit<ToggleButtonGroupProps, 'value' | 'onChange'> {
  options: ToggleButtonOption[];
  value: string;
  onChange: (value: string) => void;
}

const StyledToggleButtons: FC<StyledToggleButtonsProps> = ({
  options = [],
  value,
  onChange,
  ...props
}) => {
  const classes = useStyles();
  const children = useMemo(() => {
    return options?.map((option, i) => {
      return (
        <ToggleButton
          key={i}
          value={option.id}
          classes={{ root: classes.root, selected: classes.selected }}
        >
          {option.label}
          {option.icon && (
            <option.icon className={classes.icon} color="inherit" />
          )}
        </ToggleButton>
      );
    });
  }, [options]);

  const handleChange = (e: MouseEvent<HTMLElement>, v: any) => v && onChange(v);

  return (
    <ToggleButtonGroup
      className={classes.container}
      exclusive
      {...props}
      value={value}
      onChange={handleChange}
    >
      {children}
    </ToggleButtonGroup>
  );
};

export default StyledToggleButtons;
