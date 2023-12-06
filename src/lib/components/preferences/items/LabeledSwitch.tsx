import React, { FC } from 'react';
import ToggleSwitch, { ToggleSwitchProps } from '../components/ToggleSwitch';

const LabeledSwitch: FC<ToggleSwitchProps> = (props) => {
  return <ToggleSwitch {...props} />;
};

export default LabeledSwitch;
