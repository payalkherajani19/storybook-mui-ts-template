import React, { FC } from 'react';
import { useValidations } from '../../../utils';
import Validation, { ValidationProps } from './Validation';

const MultilineValidation: FC<ValidationProps> = (props) => {
  const { commonValidation } = useValidations();
  return <Validation {...props} validations={commonValidation}></Validation>;
};

export default MultilineValidation;
