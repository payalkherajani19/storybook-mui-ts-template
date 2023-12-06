import React, { FC, MouseEvent } from 'react';
import { Container, Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { ReactSortable } from 'react-sortablejs';
import { useDndEditorContext } from '../DndEditorProvider';
import { renderItems, setList } from '../utils';
import clsx from 'clsx';

const useStyles = makeStyles(({ palette: { primary }, spacing }: Theme) => ({
  document: {
    padding: spacing(4, 2),
  },
  root: {
    width: '100%',
    minHeight: 240,
    '& .dnd-item': {
      height: 40,
      backgroundColor: alpha(primary.main, 0.08),
      border: `2px dashed ${primary.main}`,
      '& > *': {
        opacity: 0,
      },
    },
  },
  active: {
    '& > *': {
      outline: `1px solid ${primary.main}`,
    },
  },
}));

const DndEditorPreview: FC = () => {
  const classes = useStyles();
  const renderProps = useDndEditorContext();


  const handleClick = (ev: MouseEvent<HTMLDivElement>) => {
    ev.stopPropagation();
    renderProps.onActiveChange(null);
  };

  const setData = (dataTransfer: DataTransfer, draggedElement: HTMLElement) => {
    const dragImage = document.createElement('img');
    dragImage.src = draggedElement.dataset.dragImage as string;
    dataTransfer.setDragImage(dragImage, -10, -10);
  };

  const _children = (
    //@ts-ignore
    <ReactSortable
      animation={300}
      group={{ name: 'shared', put: ['shared'] }}
      list={renderProps.state.items}
      setList={setList(renderProps)}
      className={classes.root}
      handle=".sortable-handle"
      setData={setData}
    >
      {renderItems(renderProps.state.items, renderProps)}
    </ReactSortable>
  );
  return (
    <Container
      className={clsx(classes.document, !renderProps.active && classes.active)}
      maxWidth="md"
      onClick={handleClick}
    >
      <>{!!(renderProps.template.render)&&  renderProps?.template?.render(renderProps, _children)}</>
    </Container>
  );
};

export default DndEditorPreview;
