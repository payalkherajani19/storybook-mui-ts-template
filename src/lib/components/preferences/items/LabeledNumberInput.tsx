import React, { FC } from 'react';
import Input from '../components/Input';
import { StyledTextFieldProps } from '../components/StyledTextField';

const LabeledNumberInput: FC<StyledTextFieldProps> = (props) => {
  return <Input {...props} type="number" />;
};

export default LabeledNumberInput;
