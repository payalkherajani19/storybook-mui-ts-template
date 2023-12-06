import React, { FC } from 'react';
import { Trans } from '@lingui/macro';
import Input, { InputProps } from '../components/Input';

const Url: FC<InputProps> = (props) => {
  return (
    <Input
      label={<Trans>URL</Trans>}
      type="url"
      placeholder="https://..."
      {...props}
    />
  );
};

export default Url;
