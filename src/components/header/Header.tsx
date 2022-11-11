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
import React from 'react';
import './header.scss';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const goHome = () => navigate('/');
  const goBoards = () => navigate('/boards');
  const goBetaBoard = () => navigate('/boards/1');
  const goProfile = () => navigate('/profile');
  const goSignIn = () => navigate('/login');
  const goSignUp = () => navigate('/registration');

  return (
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
            <Button color="inherit" onClick={goBetaBoard}>
              Beta Board
            </Button>
            <Button color="inherit" onClick={goProfile}>
              Profile
            </Button>
          </ButtonGroup>

          <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{ ml: 'auto' }}>
            <Button color="inherit" onClick={goSignIn}>
              Sign in
            </Button>
            <Button color="inherit" onClick={goSignUp}>
              Sign up
            </Button>
          </ButtonGroup>

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
          <Button color="inherit">Log out</Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
