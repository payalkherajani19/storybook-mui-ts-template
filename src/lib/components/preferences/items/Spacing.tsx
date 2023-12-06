import React, { FC } from 'react';
import { Trans } from '@lingui/macro';
import Input, { InputProps } from '../components/Input';

const Spacing: FC<InputProps> = (props) => {
  return <Input label={<Trans>Spacing</Trans>} {...props} />;
};

export default Spacing;
