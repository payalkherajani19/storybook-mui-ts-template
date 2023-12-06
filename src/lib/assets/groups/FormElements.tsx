import React from 'react';
import { Trans } from '@lingui/macro';
import { Assignment } from '@mui/icons-material';
import { DndGroupItem } from '../../types';

export default {
  id: 'form-elements',
  type: 'group',
  renderMode: 'hidden',
  icon: Assignment,
  label: <Trans>Form Elements</Trans>,
  priority: 2,
} as unknown as DndGroupItem;
