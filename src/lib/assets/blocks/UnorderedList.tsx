import React from 'react';
import { Trans } from '@lingui/macro';
import { merge } from 'lodash-es';
import { DndBlockItem } from '../../types';
import Text from '../components/Text';

export default {
  id: 'unordered-list',
  label: <Trans>Unordered List</Trans>,
  render: (renderProps) => Text.render(renderProps, 'unordered-list-1'),
  export: (renderProps) => {
    const output = Text.export(renderProps, 'unordered-list-1');
    return output.replace('<ol>', '<ul>').replace('</ol>', '</ul>');
  },
  image:
    'data:image/png;base64,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',
  initialValues: {
    'unordered-list-1': merge({}, Text.initialValues, {
      label: `
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            `,
    }),
  },
  parent: 'basic-elements',
  settings: [
    {
      id: 'unordered-list-1',
      label: <Trans>Unordered List</Trans>,
      type: 'text',
      settings: Text.settings,
    },
  ],
  type: 'block',
} as DndBlockItem;
