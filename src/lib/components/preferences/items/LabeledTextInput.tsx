import React, { FC } from 'react';
import Input from '../components/Input';
import { StyledTextFieldProps } from '../components/StyledTextField';

const LabeledTextInput: FC<StyledTextFieldProps> = (props) => {
  return <Input type="text" {...props} />;
};

export default LabeledTextInput;
