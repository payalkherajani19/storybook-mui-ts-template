import React, { FC } from 'react';
import { Trans } from '@lingui/macro';
import { useFonts } from '../../../utils';
import Dropdown, {
  DropdownOption,
  DropdownProps,
} from '../components/Dropdown';

const FontWeight: FC<DropdownProps> = (props) => {
  const { fontWeights } = useFonts();
  const options: DropdownOption[] = fontWeights.map((weight) => ({
    ...weight,
    style: {
      fontWeight: weight.id,
    },
  }));
  return (
    <Dropdown label={<Trans>Font Weight</Trans>} {...props} options={options} />
  );
};

export default FontWeight;
