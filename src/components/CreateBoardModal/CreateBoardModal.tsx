import React from 'react';
import InputText from 'components/InputText/InputText';
import Modal from 'components/Modal/Modal';
import UsersSelect from 'components/UsersSelect/UsersSelect';
import { SubmitHandler, useForm } from 'react-hook-form';

type CreateBoardFormFields = { title: string; users: string[] };
type CreateBoardModalProps = { open: boolean; onModalClose: () => void };

const CreateBoardModal = ({ open, onModalClose }: CreateBoardModalProps) => {
  let users: string[] = [];

  const { handleSubmit, control } = useForm<CreateBoardFormFields>({
    defaultValues: {
      title: '',
    },
  });

  const onSubmit: SubmitHandler<CreateBoardFormFields> = (data) => {
    console.log(data);
    console.log(users);
    // TODO dispatch createBoardAction
    onModalClose();
  };

  const onShare = (usersId: string[]) => {
    users = usersId;
  };

  return (
    <Modal open={open} onClickCancel={onModalClose} onClickConfirm={handleSubmit(onSubmit)}>
      <>
        <InputText
          name="title"
          label="title"
          autoComplete="title"
          control={control}
          rules={{
            required: 'title is required',
          }}
          inputProps={{
            style: { fontSize: '1.2rem' },
          }}
        />
        <UsersSelect onUserSelect={onShare} />
      </>
    </Modal>
  );
};

export default CreateBoardModal;
