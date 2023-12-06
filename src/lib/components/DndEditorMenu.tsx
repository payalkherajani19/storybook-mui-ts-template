import React, { FC, useState, useMemo, MouseEvent } from 'react';
import { Popper, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { groupBy, sortBy } from 'lodash-es';
import { usePopupState, bindPopper } from 'material-ui-popup-state/hooks';
import { useDndEditorContext } from '../DndEditorProvider';
import { DndBlockItem, DndItem, DndGroupItem } from '../types';
import { addItem } from '../utils';
import { MenuHoverList, MenuItem } from './menu/MenuItem';

const useStyles = makeStyles(({ spacing, zIndex }: Theme) => ({
  root: {
    padding: spacing(4, 0),
  },
  popper: {
    zIndex: zIndex.tooltip,
    maxHeight: '100%',
    overflow: 'scroll',
  },
}));

const DndEditorMenu: FC = () => {
  const [hovered, setHovered] = useState('');
  const [minimized, setMinimized] = useState(true);
  const editorContext = useDndEditorContext();

  const groupedItems = useMemo(
    () => groupBy(editorContext.items, 'type'),
    [editorContext.items]
  );
  const groupedBlocks = useMemo(
    () => groupBy(groupedItems.block, 'parent'),
    [editorContext.items]
  );
  const hoveredItems = useMemo(
    () => groupedBlocks[hovered],
    [hovered, editorContext.items]
  ) as DndBlockItem[];

  const popupState = usePopupState({
    variant: 'popper',
    popupId: 'dnd-menu-item',
    disableAutoFocus: true,
  });
  const classes = useStyles();
  const handleMouseEnter =
    (item: DndItem) => (event: MouseEvent<HTMLButtonElement>) => {
      setHovered(item.id);
      popupState.open(event);
    };

  const handleAddItem =
    (item: DndBlockItem) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      event.preventDefault();
      addItem(editorContext, item);
    };

  const menuItemProps = (group: DndItem) => {
    return {
      group: group as DndGroupItem,
      blocks: groupedBlocks[group.id] as DndBlockItem[],
      classes,
      popupState,
      isHovered: group.id === hovered,
      handleMouseEnter,
      minimized,
      addItem: handleAddItem,
    };
  };

  const handleRootMouseLeave = () => setMinimized(true);
  const handleRootMouseEnter = () => setMinimized(false);

  const handlePopperMouseLeave = () => popupState.close();

  return (
    <>
      <div
        className={classes.root}
        onMouseLeave={handleRootMouseLeave}
        onMouseEnter={handleRootMouseEnter}
      >
        <Popper
          transition
          placement="right"
          className={classes.popper}
          {...bindPopper(popupState)}
          keepMounted={false}
          onMouseLeave={handlePopperMouseLeave}
        >
          <MenuHoverList
            listItems={hoveredItems}
            handleAddItem={handleAddItem}
          />
        </Popper>
        {sortBy(groupedItems.group, 'priority')
          .filter((item) => groupedBlocks[item.id])
          .map((item, i) => (
            <div key={i}>
              <MenuItem {...menuItemProps(item)} />
            </div>
          ))}
      </div>
    </>
  );
};

export default DndEditorMenu;
