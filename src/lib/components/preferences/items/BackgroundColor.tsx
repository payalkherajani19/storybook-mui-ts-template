import React, { FC } from 'react';
import { Trans } from '@lingui/macro';
import Colorpicker, { ColorpickerProps } from '../components/Colorpicker';

const BackgroundColor: React.FC<ColorpickerProps> = (props) => {
  return <Colorpicker label={<Trans>Background Color</Trans>} {...props} />;
};

export default BackgroundColor;
