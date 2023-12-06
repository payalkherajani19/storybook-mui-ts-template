import React, { FC } from 'react';
import { Trans } from '@lingui/macro';
import Colorpicker, { ColorpickerProps } from '../components/Colorpicker';

const BorderColor: FC<ColorpickerProps> = (props) => {
  return <Colorpicker label={<Trans>Border Color</Trans>} {...props} />;
};

export default BorderColor;
