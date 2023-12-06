import React, { FC, Dispatch, SetStateAction } from 'react';
import Container from '../../assets/Container';
import { useDndEditorContext } from '../../DndEditorProvider';
import SettingsBase from './SettingsBase';

interface Props {
  expanded: string;
  setExpanded: Dispatch<SetStateAction<string>>;
  showContainerTab: boolean;
}

const ButtonSettings: FC<Props> = (props) => {
  const editorContext = useDndEditorContext();
  const activeItem = editorContext.active
    ? editorContext.itemsMap[
        editorContext.state.entities[editorContext.active].parent.id
      ]
    : null;
  if (!activeItem || !editorContext.active) {
    return null;
  }
  const template = editorContext.template;
  const settings = [
    ...(activeItem.settings?.filter((s) => s.type === 'button') ?? []),
    ...(!props.showContainerTab && Container[template.id].settings
      ? Container[template.id].settings!
      : []),
  ];
  const values =
    editorContext.state.entities[editorContext.active]?.values ?? {};

  return (
    <SettingsBase
      {...props}
      renderProps={editorContext}
      initialValues={values}
      settings={settings}
      id={editorContext.active}
    />
  );
};

export default ButtonSettings;
