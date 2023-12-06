import React from 'react';
import { Trans } from '@lingui/macro';
import { RemoveOutlined } from '@mui/icons-material';
import { DndGroupItem } from '../../types';

export default {
  id: 'divider',
  icon: RemoveOutlined,
  type: 'group',
  renderMode: 'container',
  label: <Trans>Separator</Trans>,
  priority: 4,
} as unknown as DndGroupItem;
