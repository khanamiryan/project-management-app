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
  //useAddTaskMutation,
  //useGetTasksByColumnQuery,
} from './../../../services/board.api';
import Modal from 'components/Modal/Modal';
import ModalCreate from '../ModalCreate/ModalCreate';
import { useDrag, useDrop } from 'react-dnd';
import { Filter } from '@mui/icons-material';

interface ITaskListProps {
  dataColumn: IColumn;
  dataTasks: ITask[] | undefined;
  onDeleteColumn: (selectedColumn: IColumn) => void;
}
interface IDropResult {
  dataColumn: IColumn;
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

  // const [deleteColumn] = useDeleteColumnMutation();
  const [updateColumn] = useUpdateColumnMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTasksSet] = useUpdateTasksSetMutation();
  const [updateColumnsSet] = useUpdateColumnsSetMutation();
  const { data: dataColumns } = useGetColumnsQuery(dataColumn.boardId);

  const ref = useRef(null);

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'column',
    item: dataColumn,
    end: (dataColumnDrag, monitor) => {
      console.log(' start function end');
      const dataColumnDrop = monitor.getDropResult<IDropResult>()?.dataColumn;
      if (dataColumnDrag && dataColumnDrop) {
        console.log('данные из DND', dataColumnDrag, dataColumnDrop);
        const { order: orderDrag, _id: idDrag } = dataColumnDrag;
        const { order: orderDrop, _id: idDrop } = dataColumnDrop;
        //orderDrop = orderDrag;
        const newDataColumnsPATCH = dataColumns
          ?.filter((item) => {
            if (
              (item.order >= orderDrag && item.order <= orderDrop) ||
              (item.order >= orderDrop && item.order <= orderDrag)
            ) {
              return item;
            }
          })
          .map((column) => {
            const { order, _id, title } = column;
            switch (order) {
              case orderDrag:
                return { order: orderDrop, _id: _id };
              case orderDrop:
                if (orderDrop > orderDrag) {
                  return { order: orderDrop - 1, _id: _id };
                } else {
                  return { order: orderDrop + 1, _id: _id };
                }
              default:
                if (column.order < orderDrop) {
                  console.log(orderDrop);
                  return { order: column.order - 1, _id: _id };
                } else {
                  console.log(orderDrop);
                  return { order: column.order + 1, _id: _id };
                }
            }
          });

        console.log(newDataColumnsPATCH);

        if (newDataColumnsPATCH) {
          updateColumnsSet(newDataColumnsPATCH);
          //newDataColumnsPATCH = undefined;
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'column',
    drop: () => ({ dataColumn }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  dragRef(dropRef(ref));

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
    //setActionModalCreate('Add');
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

        <Stack className="tasks-list" direction={'column'} spacing={1}>
          {dataTasks &&
            dataTasks.map((task) => {
              return (
                <TaskCard
                  key={task._id}
                  dataTask={task}
                  editTask={editTask}
                  onDelete={onDeleteTask}
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
