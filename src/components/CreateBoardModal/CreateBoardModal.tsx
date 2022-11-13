import InputText from 'components/InputText/InputText';
import Modal from 'components/Modal/Modal';
import UsersSelect from 'components/UsersSelect/UsersSelect';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export type CreateBoardFormFields = {
  title: string;
  users: string[];
};

const CreateBoardModal = ({ open, onModalClose }: { open: boolean; onModalClose: () => void }) => {
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
