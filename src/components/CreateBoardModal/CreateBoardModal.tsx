import InputText from 'components/InputText/InputText';
import Modal from 'components/Modal/Modal';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type CreateBoardFormFields = {
  title: string;
};

const CreateBoardModal = ({ open, onModalClose }: { open: boolean; onModalClose: () => void }) => {
  const { handleSubmit, control } = useForm<CreateBoardFormFields>({
    defaultValues: {
      title: '',
    },
  });

  const onSubmit: SubmitHandler<CreateBoardFormFields> = (data) => {
    console.log(data);
    // TODO diapatch createBoard
    onModalClose();
  };

  return (
    <Modal open={open} onClickCancel={onModalClose} onClickConfirm={handleSubmit(onSubmit)}>
      <InputText
        name="title"
        label="title"
        autoComplete="title"
        control={control}
        rules={{
          required: 'title is required',
        }}
      />
    </Modal>
  );
};

export default CreateBoardModal;
