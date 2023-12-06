import React, { FC } from 'react';
import { Trans } from '@lingui/macro';
import {
  FormatAlignCenterOutlined,
  FormatAlignLeftOutlined,
  FormatAlignRightOutlined,
} from '@mui/icons-material';
import { ToggleButtonOption } from '../components/StyledToggleButtons';
import ToggleButtons, { ToggleButtonsProps } from '../components/ToggleButtons';

const Align: FC<ToggleButtonsProps> = (props) => {
  const options: ToggleButtonOption[] = [
    {
      icon: FormatAlignLeftOutlined,
      id: 'left',
    },
    {
      icon: FormatAlignCenterOutlined,
      id: 'center',
    },
    {
      icon: FormatAlignRightOutlined,
      id: 'right',
    },
  ];
  return (
    <ToggleButtons {...props} label={<Trans>Align</Trans>} options={options} />
  );
};

export default Align;
