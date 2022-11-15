import React, { useEffect, useState } from 'react';
import './Profile.scss';
import InputText from '../InputText/InputText';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box } from '@mui/system';
import { deleteUser, getUser, selectUser, setUserInfo } from '../../store/userSlice';
import { Alert, Button } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/redux.hooks';
import Modal from '../Modal/Modal';
import { Warning } from '@mui/icons-material';
import Toast from '../Toast/Toast';

interface IProfile {
  name: string;
  login: string;
  password: string;
}

const Profile = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<IProfile>({
    defaultValues: {
      name: user.name,
      login: user.login,
      password: '',
    },
  });
  useEffect(() => {
    //todo add getCurrentUser function, without giving id
    //  todo add function, that will dynamically change values, if it was changed in another place
    if (user.id) {
      //in the future if will not used, because it will page with private id
      dispatch(getUser(user.id));
    }
  }, []);

  const onSubmit: SubmitHandler<IProfile> = (data) => {
    dispatch(setUserInfo(data)).then(() => {
      alert('ok');
    });
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(user.id)).then(() => {
      setOpen(false);
    });
  };

  const [open, setOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    if (user.error.length) {
      setToastOpen(true);
    } else {
      setToastOpen(false);
    }
  }, [user.error]);
  return (
    <Box component={'form'} autoComplete={'off'} onSubmit={handleSubmit(onSubmit)}>
      {user.error && <Alert severity={'error'}>{user.error}</Alert>}
      {user.error && (
        <Toast
          open={toastOpen}
          onClose={() => {
            setToastOpen(false);
          }}
        >
          {user.error}
        </Toast>
      )}

      <Modal
        confirmButtonText={user.loading ? 'Deleting...' : 'Confirm'}
        open={open}
        onClickCancel={() => {
          setOpen(false);
        }}
        onClickConfirm={handleDeleteUser}
      >
        <>
          <Warning color="error" />
          Вы уверены, что хотите удалить?
        </>
      </Modal>

      <div>
        <InputText
          name="name"
          label="Name"
          autoComplete="off"
          control={control}
          rules={{
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Login is too short',
            },
          }}
        />
      </div>
      <div>
        <InputText
          name="login"
          label="Login"
          autoComplete="off"
          control={control}
          rules={{
            required: 'Login is required',
            minLength: {
              value: 3,
              message: 'Login is too short',
            },
          }}
        />
      </div>
      {/*<div>*/}
      {/*  <InputText*/}
      {/*    name="new_password"*/}
      {/*    autoComplete="new-password"*/}
      {/*    control={control}*/}
      {/*    rules={{*/}
      {/*      //if it's empty, we should not change the password*/}
      {/*      minLength: {*/}
      {/*        value: 3,*/}
      {/*        message: 'Password is too short',*/}
      {/*      },*/}
      {/*    }}*/}
      {/*    margin="normal"*/}
      {/*    label="New Password"*/}
      {/*    type="password"*/}
      {/*    // autoComplete="password"*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <InputText*/}
      {/*    name="confirm_password"*/}
      {/*    control={control}*/}
      {/*    rules={{*/}
      {/*      //if it's empty, we should not change the password*/}
      {/*      minLength: {*/}
      {/*        value: 3,*/}
      {/*        message: 'Password is too short',*/}
      {/*      },*/}
      {/*    }}*/}
      {/*    margin="normal"*/}
      {/*    label="Confirm Password"*/}
      {/*    type="password"*/}
      {/*    // autoComplete="password"*/}
      {/*  />*/}
      {/*</div>*/}

      {/*<Divider variant="fullWidth" />*/}

      <div>
        <InputText
          name="password"
          control={control}
          rules={{
            required: 'Current password is required for approve changes',
            //if it's empty, we should not change the password
            minLength: {
              value: 3,
              message: 'Password is too short',
            },
          }}
          margin="normal"
          label="Current Password"
          type="password"
          autoComplete="new-password"
        />
      </div>

      <Button variant={'contained'} type="submit" disabled={!isDirty || user.loading}>
        Submit {user.loading && '...'}
      </Button>
      <Button onClick={() => setOpen(true)}>Delete User</Button>
    </Box>
  );
};

export default Profile;
