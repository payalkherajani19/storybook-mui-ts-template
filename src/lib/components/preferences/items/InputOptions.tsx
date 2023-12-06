import React, { FC } from 'react';
import { Trans } from '@lingui/macro';
import { InputProps } from '@mui/material';
import LabeledTextInput from './LabeledTextInput';
import { StringFormValue } from '../../../types';

export type InputOption = {
  key: string;
  label: string;
  value: StringFormValue;
};
export interface OptionsProps extends Omit<InputProps, 'value' | 'onChange'> {
  value: InputOption[];
  onChange: (value: InputOption[]) => void;
}
const InputOptions: FC<OptionsProps> = ({ onChange, value }) => {
  const handleOnChange = (value: any) => {
    onChange(
      value
        .split('\n')
        .filter(Boolean)
        .map((option: string) => ({
          key: option.split(' ').join('-').toLowerCase(),
          label: option,
          value: {
            text: option,
            valueType: 'String',
          },
        }))
    );
  };
  const inputValue = value && value.map((v) => v.label).join('\n');
  return (
    <LabeledTextInput
      label={<Trans>Options</Trans>}
      value={inputValue}
      multiline={true}
      rows="4"
      onChange={handleOnChange}
      helperText={<Trans>Options should be separated by new line.</Trans>}
    />
  );
};

export default InputOptions;
