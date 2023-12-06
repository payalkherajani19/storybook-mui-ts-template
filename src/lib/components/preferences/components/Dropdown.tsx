import React, { ReactNode, FC, useMemo, CSSProperties } from 'react';
import Input from './Input';
import { StyledTextFieldProps } from './StyledTextField';
import { MenuItem } from '@mui/material';

export type DropdownOption =
  | string
  | {
      label: ReactNode;
      id: string | number;
      style?: CSSProperties;
    };
export interface DropdownProps extends StyledTextFieldProps {
  options: DropdownOption[];
}

const Dropdown: FC<DropdownProps> = ({ options = [], ...props }) => {
  const children = useMemo(() => {
    return options?.map((option, i) => {
      const opt =
        typeof option === 'string'
          ? { label: option, id: option, style: {} }
          : option;
      return (
        <MenuItem dense key={i} value={opt.id} style={opt.style}>
          {opt.label}
        </MenuItem>
      );
    });
  }, [options]);
  const items = [
    ...(props.placeholder
      ? [
          <MenuItem value="" selected disabled style={{ display: 'none' }}>
            {props.placeholder}
          </MenuItem>,
        ]
      : []),
    children,
  ];
  return (
    <Input select {...props}>
      {items}
    </Input>
  );
};

export default Dropdown;
