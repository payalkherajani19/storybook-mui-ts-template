import React, { FC } from 'react';
import { Trans } from '@lingui/macro';
import Input, { InputProps } from '../components/Input';

const Space: FC<InputProps> = (props) => {
  return <Input label={<Trans>Space</Trans>} {...props} />;
};

export default Space;
