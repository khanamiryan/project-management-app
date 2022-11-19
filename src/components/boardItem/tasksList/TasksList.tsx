import { Box, Button, ButtonGroup, Card, Input } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import { IColumn, ITask } from 'types/types';
import TaskCard from '../taskCard/TaskCard';
import './tasksList.scss';
import {
  useDeleteColumnMutation,
  useDeleteTaskMutation,
  useUpdateColumnMutation,
  useUpdateTasksSetMutation,
  //useAddTaskMutation,
  //useGetTasksByColumnQuery,
} from './../../../services/board.api';
import Modal from 'components/Modal/Modal';
import ModalCreate from '../ModalCreate/ModalCreate';

interface ITaskListProps {
  dataColumn: IColumn;
  dataTasks: ITask[] | undefined;
}

export default function TasksList({ dataColumn, dataTasks }: ITaskListProps): JSX.Element {
  const { _id: columnId, title, boardId } = dataColumn;

  const [openModal, setOpenModal] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [actionModalCreate, setActionModalCreate] = useState<'Add' | 'Edit'>('Add');
  const [currentTaskData, setCurrentTaskData] = useState<ITask | null>(null);

  const [editTitleColumn, setEditTitleColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState(dataColumn.title);

  const [deleteColumn] = useDeleteColumnMutation();
  const [updateColumn] = useUpdateColumnMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTasksSet] = useUpdateTasksSetMutation();

  const confirmDeleteColumn = () => {
    deleteColumn({ _id: columnId, boardId: boardId });
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
    console.log('delete');
    deleteTask(selectedTask);
    if (selectedTask.order === dataTasks?.length) {
      console.log('it was last task at column');
    } else if (dataTasks) {
      //TODO change tasks order
      //       [
      //   {
      //     "_id": "string",
      //     "order": 0,
      //     "columnId": "string"
      //   }
      // ]
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
      <Card className="board-column" variant="outlined">
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
