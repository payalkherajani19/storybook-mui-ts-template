import React, { FC } from 'react';
import { Trans } from '@lingui/macro';
import Colorpicker, { ColorpickerProps } from '../components/Colorpicker';

const FontColor: FC<ColorpickerProps> = (props) => {
  return <Colorpicker label={<Trans>Font Color</Trans>} {...props} />;
};

export default FontColor;
