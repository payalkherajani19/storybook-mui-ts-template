import React, { FC } from 'react';
import { useValidations } from '../../../utils';
import Validation, { ValidationProps } from './Validation';

const InputValidation: FC<ValidationProps> = (props) => {
  const { validations } = useValidations();
  return <Validation {...props} validations={validations}></Validation>;
};

export default InputValidation;
