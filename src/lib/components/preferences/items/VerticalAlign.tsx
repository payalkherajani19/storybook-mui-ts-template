import React, { FC } from 'react';
import { Trans } from '@lingui/macro';
import {
  FormatAlignCenterOutlined,
  FormatAlignLeftOutlined,
  FormatAlignRightOutlined,
} from '@mui/icons-material';
import { ToggleButtonOption } from '../components/StyledToggleButtons';
import ToggleButtons, { ToggleButtonsProps } from '../components/ToggleButtons';

const VerticalAlign: FC<ToggleButtonsProps> = (props) => {
  const options: ToggleButtonOption[] = [
    {
      icon: FormatAlignLeftOutlined,
      id: 'flex-start',
    },
    {
      icon: FormatAlignCenterOutlined,
      id: 'center',
    },
    {
      icon: FormatAlignRightOutlined,
      id: 'flex-end',
    },
  ];
  return (
    <ToggleButtons
      {...props}
      label={<Trans>Vertical Align</Trans>}
      options={options}
    />
  );
};

export default VerticalAlign;
