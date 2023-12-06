import React, { FC } from 'react';
import { Trans } from '@lingui/macro';
import Colorpicker, { ColorpickerProps } from '../components/Colorpicker';

const LinkColor: FC<ColorpickerProps> = (props) => {
  return <Colorpicker label={<Trans>Link Color</Trans>} {...props} />;
};

export default LinkColor;
