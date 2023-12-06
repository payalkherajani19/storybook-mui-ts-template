import React, { FC } from 'react';
import { Trans } from '@lingui/macro';
import Input, { InputProps } from '../components/Input';

const Border: FC<InputProps> = (props) => {
  return <Input label={<Trans>Border</Trans>} {...props} />;
};

export default Border;
