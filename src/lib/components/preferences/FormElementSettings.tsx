import React, { FC, Dispatch, SetStateAction } from 'react';
import { Trans } from '@lingui/macro';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDndEditorContext } from '../../DndEditorProvider';
import { DndBlockItem } from '../../types';
import { updateItemName } from '../../utils';
import LabeledTextInput from './items/LabeledTextInput';
import SettingsBase from './SettingsBase';

interface Props {
  expanded: string;
  setExpanded: Dispatch<SetStateAction<string>>;
  showContainerTab: boolean;
}

const useStyles = makeStyles(({ spacing }: Theme) => ({
  formName: {
    padding: spacing(2),
  },
}));
const FormElementsSettings: FC<Props> = (props) => {
  const editorContext = useDndEditorContext();
  const activeItemBlock = editorContext.active
    ? editorContext.itemsMap[
        editorContext.state.entities[editorContext.active].parent.id
      ]
    : null;
  if (!activeItemBlock || !editorContext.active) {
    return null;
  }
  const classes = useStyles();
  const activeItem = editorContext.state.entities[editorContext.active];
  const activeItemSettings = !!(activeItemBlock as DndBlockItem)
    .generateSettings
    ? (activeItemBlock as DndBlockItem)?.generateSettings!(editorContext)
    : activeItemBlock?.settings;
  const settings = [
    ...(activeItemSettings?.filter((s) => s.type === 'form-elements') ?? []),
  ];
  const values =
    editorContext.state.entities[editorContext.active]?.values ?? {};

  const blockNameProps = {
    value: activeItem.name,
    onChange: (newValue: any) =>
      updateItemName(editorContext, activeItem.id, newValue),
    label: <Trans>Form element name</Trans>,
  };

  return (
    <>
      <div key={activeItem.id} className={classes.formName}>
        <LabeledTextInput {...blockNameProps} />
      </div>
      <SettingsBase
        {...props}
        renderProps={editorContext}
        initialValues={values}
        settings={settings}
        id={editorContext.active}
      />
    </>
  );
};

export default FormElementsSettings;
