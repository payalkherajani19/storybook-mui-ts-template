import React, { FC, useRef } from 'react';
import { WysiwygEditor, WysiwygEditorProps } from '@saastack/wysiwyg-editor';
import { useDndEditorContext } from '../../DndEditorProvider';

interface Props extends Omit<WysiwygEditorProps, 'value' | 'onChange'> {
  value?: string;
  onChange?: (text: string) => void;
}

const Editor: FC<Props> = ({ value, onChange, readOnly, className }) => {
  const { smartyTags } = useDndEditorContext();
  const suggestions = useRef(
    Object.keys(smartyTags ?? {}).map((key) => `{{${key}}}`)
  ).current;
  if (readOnly) {
    return (
      <div className="quill">
        <div className="ql-container ql-bubble ql-snow">
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: value ?? '' }}
          />
        </div>
      </div>
    );
  }
  return (
    <WysiwygEditor
      theme="snow"
      suggestions={suggestions}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
};

export default Editor;
