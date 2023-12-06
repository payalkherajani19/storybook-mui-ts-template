import React, { FC } from 'react';
import { Trans } from '@lingui/macro';
import Input, { InputProps } from '../components/Input';

const Height: FC<InputProps> = (props) => {
  return <Input label={<Trans>Height</Trans>} {...props} />;
};

export default Height;
