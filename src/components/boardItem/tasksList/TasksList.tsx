import { Box, Button, ButtonGroup, Card, Input } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useRef, useState } from 'react';
import { IColumn, ITask } from 'types/types';
import TaskCard from '../taskCard/TaskCard';
import './tasksList.scss';
import {
  useDeleteTaskMutation,
  useGetColumnsQuery,
  useUpdateColumnMutation,
  useUpdateColumnsSetMutation,
  useUpdateTasksSetMutation,
} from './../../../services/board.api';
import Modal from 'components/Modal/Modal';
import ModalCreate from '../ModalCreate/ModalCreate';
import { useDrag, useDrop } from 'react-dnd';
import { dndUpdateColumns } from 'services/dndSortColumns';

interface ITaskListProps {
  dataColumn: IColumn;
  dataTasks: ITask[] | undefined;
  onDeleteColumn: (selectedColumn: IColumn) => void;
}

export default function TasksList({
  dataColumn,
  dataTasks,
  onDeleteColumn,
}: ITaskListProps): JSX.Element {
  const { _id: columnId, title, boardId } = dataColumn;

  const [openModal, setOpenModal] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [actionModalCreate, setActionModalCreate] = useState<'Add' | 'Edit'>('Add');
  const [currentTaskData, setCurrentTaskData] = useState<ITask | null>(null);

  const [editTitleColumn, setEditTitleColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState(dataColumn.title);

  const [updateColumn] = useUpdateColumnMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTasksSet] = useUpdateTasksSetMutation();
  const [updateColumnsSet] = useUpdateColumnsSetMutation();
  const { data: dataColumns } = useGetColumnsQuery(dataColumn.boardId);
  const wrapperUpdateColumnsSet = (data: Pick<IColumn, '_id' | 'order'>[]) => {
    updateColumnsSet(data);
  };

  const ref = useRef(null);

  // todo: styles for isDragging components

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'column',
      item: dataColumn,
      end: (dataColumnDrag, monitor) => {
        dndUpdateColumns(dataColumnDrag, monitor, dataColumns, wrapperUpdateColumnsSet);
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [dataColumns]
  );
  // todo: styles for isOver elements
  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: 'column',
      drop: () => ({ dataColumn }),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [dataColumns]
  );

  // todo добавление карточки в пустой столбец
  const [{ isOverCard, isOverCurrentCard }, dropRefCard] = useDrop(
    () => ({
      accept: 'task',
      drop: (_itemDrag, monitor) => {
        console.log('дроп из списка', monitor.didDrop());
        console.log('_item', _itemDrag);
        if (monitor.didDrop()) {
          console.log('дроп из карточки monitor diddrop');
          return;
        }
        console.log('дроп из карточки monitor NOT diddrop', dataTasks);

        return { dataTasks, columnIdDrop: columnId };
      },
      collect: (monitor) => ({
        isOverCard: !!monitor.isOver(),
        isOverCurrentCard: !!monitor.isOver({ shallow: true }),
      }),
    }),
    [dataColumns]
  );

  dragRef(dropRef(ref));
  //dropRefCard(dragRef(dropRef(ref)));

  const confirmDeleteColumn = () => {
    onDeleteColumn(dataColumn);
    setOpenModal(false);
  };
  const cancelDeleteColumn = () => {
    setOpenModal(false);
  };

  const editTask = (taskData: ITask) => {
    setCurrentTaskData(taskData);
    setActionModalCreate('Edit');
    setOpenModalCreate(true);
  };

  const closeModalCreate = () => {
    setOpenModalCreate(false);
    setCurrentTaskData(null);
  };

  const handleAddTask = () => {
    setActionModalCreate('Add');
    setOpenModalCreate(true);
  };
  const handleDeleteColumn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setOpenModal(true);
  };
  const handleUpdateColumn = () => {
    const newColumnData = { _id: columnId, title: newColumnTitle, order: dataColumn.order };
    if (newColumnTitle !== dataColumn.title) {
      updateColumn(newColumnData);
    }
    // todo: order

    setEditTitleColumn(!editTitleColumn);
  };

  const onDeleteTask = (selectedTask: ITask) => {
    deleteTask(selectedTask);
    if (dataTasks && selectedTask.order !== dataTasks?.length) {
      const filteredTasks = dataTasks.filter(({ _id }) => _id !== selectedTask._id);
      const set = filteredTasks.map((task) => {
        if (task.order < selectedTask.order) {
          return {
            _id: task._id,
            order: task.order,
            columnId: task.columnId,
          };
        } else {
          return {
            _id: task._id,
            order: task.order - 1,
            columnId: task.columnId,
          };
        }
      });
      updateTasksSet(set);
    }
  };

  return (
    <>
      <Card className="board-column" variant="outlined" ref={ref}>
        <Box className="column-name">
          {!editTitleColumn && (
            <Stack
              className="column-title"
              direction="row"
              spacing={2}
              onClick={() => setEditTitleColumn(!editTitleColumn)}
            >
              <h3>{title}</h3> <Button onClick={(e) => handleDeleteColumn(e)}>Del</Button>
              <p>order: {dataColumn.order}</p>
            </Stack>
          )}
          {editTitleColumn && (
            <Stack className="column-title-edit" direction="row" spacing={2}>
              <Input
                onChange={(e) => {
                  setNewColumnTitle(e.currentTarget.value);
                }}
                value={newColumnTitle}
              ></Input>
              <ButtonGroup>
                <Button onClick={handleUpdateColumn}>update</Button>
                <Button onClick={() => setEditTitleColumn(!editTitleColumn)}>no</Button>
              </ButtonGroup>
            </Stack>
          )}
        </Box>

        <Stack className="tasks-list" direction={'column'} spacing={1} ref={dropRefCard}>
          {dataTasks &&
            [...dataTasks]
              .sort((a, b) => {
                if (a.order > b.order) {
                  return 1;
                } else {
                  return -1;
                }
              })
              .map((task) => {
                return (
                  <TaskCard
                    key={task._id}
                    dataTask={task}
                    dataTasks={dataTasks}
                    editTask={editTask}
                    onDelete={onDeleteTask}
                    //ref={refTask}
                  ></TaskCard>
                );
              })}
        </Stack>
        <Button variant="contained" fullWidth onClick={handleAddTask}>
          Add task
        </Button>
      </Card>
      <Modal
        open={openModal}
        title={`do you really want to remove "${title}" list?`}
        onClickConfirm={confirmDeleteColumn}
        onClickCancel={cancelDeleteColumn}
      >
        if you delete this list you will not be able to restore it
      </Modal>
      {dataTasks && (
        <ModalCreate
          type="Task"
          action={actionModalCreate}
          boardId={boardId || ''}
          currentLength={dataTasks.length}
          openModal={openModalCreate}
          closeModal={closeModalCreate}
          columnId={columnId}
          taskData={currentTaskData}
        ></ModalCreate>
      )}
    </>
  );
}
