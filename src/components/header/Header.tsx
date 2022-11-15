import {
  AppBar,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  NativeSelect,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import './header.scss';
import { useNavigate } from 'react-router-dom';
import CreateBoardModal from 'components/CreateBoardModal/CreateBoardModal';
import { selectUser, signOut } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/redux.hooks';

const Header = () => {
  const navigate = useNavigate();
  const goHome = () => navigate('/');
  const goBoards = () => navigate('/boards');
  const goBetaBoard = () => navigate('/boards/1');
  const goProfile = () => navigate('/profile');
  const goSignIn = () => navigate('/login');
  const goSignUp = () => navigate('/registration');

  const [modalOpen, setModalOpen] = useState(false);
  const onClickAddBoard = () => {
    setModalOpen(true);
  };
  const onModalClose = () => setModalOpen(false);

  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const logOut = () => {
    dispatch(signOut());
    navigate('/');
  };
  return (
    <>
      <AppBar position="sticky">
        <Toolbar component="nav">
          <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="h3">
              My Project Name
            </Typography>
            <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{ ml: 'auto' }}>
              <Button color="inherit" onClick={goHome}>
                Main Page
              </Button>
              <Button color="inherit" onClick={goBoards}>
                Boards
              </Button>
              <Button color="inherit" onClick={onClickAddBoard}>
                Add board
              </Button>
              <Button color="inherit" onClick={goBetaBoard}>
                Beta Board
              </Button>
              <Button color="inherit" onClick={goProfile}>
                Profile
              </Button>
            </ButtonGroup>
            {!user.loggedIn && (
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
                sx={{ ml: 'auto' }}
              >
                <Button color="inherit" onClick={goSignIn}>
                  Sign in
                </Button>
                <Button color="inherit" onClick={goSignUp}>
                  Sign up
                </Button>
              </ButtonGroup>
            )}
            <FormControl>
              <NativeSelect
                defaultValue={'en'}
                inputProps={{
                  name: 'lang',
                  id: 'uncontrolled-native',
                }}
                sx={{
                  ml: 2,
                  pl: '10px',
                  borderRadius: '4px',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <option value={'en'}>en</option>
                <option value={'ru'}>ru</option>
              </NativeSelect>
            </FormControl>
            {user.loggedIn && (
              <Button color="inherit" onClick={logOut}>
                Log out
              </Button>
            )}
          </Container>
        </Toolbar>
      </AppBar>
      {modalOpen && <CreateBoardModal onModalClose={onModalClose} open={modalOpen} />}
    </>
  );
};

export default Header;
