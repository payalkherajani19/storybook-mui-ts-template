import React, { FC } from 'react';
import { Trans } from '@lingui/macro';
import Colorpicker, { ColorpickerProps } from '../components/Colorpicker';

const Color: FC<ColorpickerProps> = (props) => {
  return <Colorpicker label={<Trans>Color</Trans>} {...props} />;
};

export default Color;
