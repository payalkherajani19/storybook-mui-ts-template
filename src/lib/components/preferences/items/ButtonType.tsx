import React, { FC } from 'react';
import { Trans } from '@lingui/macro';
import { ToggleButtonOption } from '../components/StyledToggleButtons';
import ToggleButtons, { ToggleButtonsProps } from '../components/ToggleButtons';

const ButtonType: FC<ToggleButtonsProps> = (props) => {
  const options: ToggleButtonOption[] = [
    {
      label: <Trans>Link</Trans>,
      id: 'link',
    },
    {
      label: <Trans>Button</Trans>,
      id: 'button',
    },
    {
      label: <Trans>Text</Trans>,
      id: 'text',
    },
  ];
  return (
    <ToggleButtons
      {...props}
      label={<Trans>Button Type</Trans>}
      options={options}
    />
  );
};

export default ButtonType;
