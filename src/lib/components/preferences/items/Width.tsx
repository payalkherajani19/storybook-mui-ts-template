import React, { FC } from 'react';
import { Trans } from '@lingui/macro';
import Input, { InputProps } from '../components/Input';

const Width: FC<InputProps> = (props) => {
  return <Input label={<Trans>Width</Trans>} {...props} />;
};

export default Width;
