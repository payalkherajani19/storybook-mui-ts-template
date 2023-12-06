import React, { FC, useState, useMemo, useEffect, ChangeEvent } from 'react';
import { Trans } from '@lingui/macro';
import { alpha } from '@mui/material/styles';
import {
  AssignmentOutlined,
  CropLandscapeOutlined,
  DeviceHubOutlined,
  ImageOutlined,
  PaletteOutlined,
  SettingsOutlined,
  TextFieldsOutlined,
} from '@mui/icons-material';
import { groupBy } from 'lodash-es';
import { Theme, Tooltip, Tabs, Tab } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDndEditorContext } from '../DndEditorProvider';
import { PubSub } from '@saastack/pubsub/src';
import { SettingItemType, DndBlockItem } from '../types';
import ConditionSettings from './preferences/ConditionSettings';
import ContainerSettings from './preferences/ContainerSettings';
import TemplateSettings from './preferences/TemplateSettings';
import ImageSettings from './preferences/ImageSettings';
import TextSettings from './preferences/TextSettings';
import ButtonSettings from './preferences/ButtonSettings';
import FormElementsSettings from './preferences/FormElementSettings';

const useStyles = makeStyles(
  ({ spacing, palette: { divider, background } }: Theme) => ({
    root: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
    content: {
      width: '100%',
      height: `calc(100% - ${spacing(6)})`,
      overflowX: 'visible',
      overflowY: 'auto',
      marginTop: -1,
      zIndex: 0,
      position: 'relative',
    },
    tabs: {
      borderBottom: `1px solid ${alpha(divider, 0.08)}`,
      zIndex: 1,
      position: 'relative',
      backgroundColor: background.default,
    },
    tab: {
      minWidth: 0,
      margin: 0,
    },
  })
);

const tabs = [
  {
    id: 'text',
    component: TextSettings,
    label: <Trans>Edit Text</Trans>,
    icon: TextFieldsOutlined,
  },
  {
    id: 'image',
    component: ImageSettings,
    label: <Trans>Edit Image</Trans>,
    icon: ImageOutlined,
  },
  {
    id: 'button',
    component: ButtonSettings,
    label: <Trans>Edit Button</Trans>,
    icon: CropLandscapeOutlined,
  },
  {
    id: 'container',
    component: ContainerSettings,
    label: <Trans>Edit Container</Trans>,
    icon: PaletteOutlined,
  },
  {
    id: 'form-elements',
    component: FormElementsSettings,
    label: <Trans>Edit Form Element</Trans>,
    icon: AssignmentOutlined,
  },
  {
    id: 'condition',
    component: ConditionSettings,
    label: <Trans>Edit Conditions</Trans>,
    icon: DeviceHubOutlined,
  },
  {
    id: 'template',
    component: TemplateSettings,
    label: <Trans>Edit Template</Trans>,
    icon: SettingsOutlined,
  },
];

const DndEditorPreferences: FC = () => {
  const classes = useStyles();
  const renderProps = useDndEditorContext();
  const { itemsMap, state, active } = renderProps;
  const [tab, setTab] = useState<SettingItemType>('template');
  const [expanded, setExpanded] = useState('');
  const ActiveTab = useMemo(
    () => tabs.find((t) => t.id === tab)?.component,
    [tab]
  );
  const activeItem = active ? itemsMap[state.entities[active].parent.id] : null;

  const groupedSettings =
    (activeItem &&
      Object.keys(
        groupBy(
          !!(activeItem as DndBlockItem).generateSettings
            ? (activeItem as any)?.generateSettings(renderProps)
            : activeItem?.settings,
          'type'
        )
      )) ||
    [];

  const showContainerTab = groupedSettings.length > 1;

  const availableSettings = useMemo(
    () => [
      ...groupedSettings,
      ...(activeItem && showContainerTab ? ['container'] : []),
      ...(activeItem ? ['condition'] : []),
      'template',
    ],
    [active]
  );
  const filteredTabs = useMemo(
    () => tabs.filter((t) => availableSettings.includes(t.id)),
    [active]
  );

  const handleChange = (ev: ChangeEvent<{}>, newValue: any) =>
    newValue && setTab(newValue);

  useEffect(() => {
    if (!filteredTabs.some((t) => t.id === tab)) {
      setTab('template');
    }
  }, [active, tab]);
  useEffect(() => {
    const subId = PubSub.subscribe('component/click', (data: { type: string; data: any; }) => {
      switch (data?.type) {
        case 'container':
          if (showContainerTab) {
            setTab('container');
            setExpanded('__container');
          }
          break;
        case 'condition':
          setTab('condition');
          setExpanded('__condition');
          break;
        default:
          setTab((data?.type as SettingItemType) ?? 'template');
          setExpanded(data?.data ?? '');
      }
    });
    return () => PubSub.unsubscribe(subId);
  }, []);
  return (
    <div className={classes.root}>
      <Tabs
        selectionFollowsFocus
        className={classes.tabs}
        value={tab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        {filteredTabs.map((tb, i) => (
          <Tab
            className={classes.tab}
            key={i}
            value={tb.id}
            icon={
              <Tooltip title={tb.label}>
                <tb.icon />
              </Tooltip>
            }
          />
        ))}
      </Tabs>
      <div className={classes.content}>
        {ActiveTab && (
          <ActiveTab
            showContainerTab={showContainerTab}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        )}
      </div>
    </div>
  );
};

export default DndEditorPreferences;
