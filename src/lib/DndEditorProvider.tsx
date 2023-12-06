import React, { createContext, useContext, FC } from 'react';

import { DndEditorContextProps } from './types';
import { createDndState } from './utils';

export const DndEditorContext = createContext<DndEditorContextProps>({
  active: null,
  state: createDndState(),
  items: [],
  itemsMap: {},
  onActiveChange: () => undefined,
  setState: () => undefined,
  template: null as any,
  buildermode: false,
  children: undefined
});

export const useDndEditorContext = () => useContext(DndEditorContext);

const DndEditorProvider: FC<DndEditorContextProps> = ({
  children,
  ...props
}) => {
  return (
    <DndEditorContext.Provider value={{...props, children}}>
      {children}
    </DndEditorContext.Provider>
  );
};

export default DndEditorProvider;
