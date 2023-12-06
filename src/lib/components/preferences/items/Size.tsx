import React, { FC } from 'react';
import { Trans } from '@lingui/macro';
import Input, { InputProps } from '../components/Input';

const Size: FC<InputProps> = (props) => {
  return <Input label={<Trans>Size</Trans>} {...props} />;
};

export default Size;
