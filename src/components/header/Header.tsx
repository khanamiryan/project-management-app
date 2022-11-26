import {
  AppBar,
  ButtonGroup,
  Toolbar,
  Typography,
  useScrollTrigger,
  Box,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
import './header.scss';
import CreateBoardModal from 'components/CreateBoardModal/CreateBoardModal';
import { signOutReducer } from '../../store/userSlice';
import { useAppDispatch } from '../../store/redux.hooks';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { api } from '../../services/api';
import { showToast } from '../../store/toastSlice';
import HeaderMenu from './Menu/Menu';
import TranslateIcon from '@mui/icons-material/Translate';
import { useUser } from '../../hooks/useUser';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const user = useUser();
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });
  const { t } = useTranslation();

  const handleSignOut = () => {
    dispatch(signOutReducer());
    dispatch(api.util.resetApiState());
    dispatch(showToast({ type: 'success', message: t('Successfully signed out') }));
  };
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const onClickAddBoard = () => {
    setModalOpen(true);
  };
  const pages = [
    // { name: t('menu.mainPage'), url: '/' },
    { name: t('menu.boards'), url: '/boards' },
    // { name: 'Beta board', url: '/boards/636cd10e96274bebf760a073' },
    { name: t('menu.profilePage'), url: '/profile' },
    { name: 'Add board', onClick: onClickAddBoard },
  ];
  const userMenu = [
    { name: t('menu.signIn'), url: '/login' },
    { name: t('menu.signUp'), url: '/registration' },
  ];

  const userAuthorizedMenu = [
    { name: t('Go to Main Page'), url: '/' },
    {
      name: t('menu.signOut'),
      icon: <LogoutIcon sx={{ ml: 0.5 }} />,
      onClick: handleSignOut,
    },
  ];

  const langs = [
    { name: 'ru', onClick: () => changeLanguage('ru') },
    { name: 'en', onClick: () => changeLanguage('en') },
  ];

  const onModalClose = () => setModalOpen(false);

  return (
    <>
      <AppBar
        elevation={trigger ? 3 : 0}
        color={trigger ? 'secondary' : 'primary'}
        position="sticky"
        sx={{ mb: 2 }}
        //sx={{ mb: 2, py: trigger ? 0.1 : 1 }}
      >
        <Toolbar component="nav">
          <Typography variant="h6" component="h3">
            Super boards
          </Typography>
          {user.loggedIn && <HeaderMenu items={pages} icon={<MenuIcon />} />}
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <ButtonGroup sx={{ ml: 'auto' }} variant={'text'}>
              <HeaderMenu
                items={user.loggedIn ? userAuthorizedMenu : userMenu}
                icon={<Avatar alt={user?.name} />}
              />
            </ButtonGroup>
          </Box>
          <Box>
            <HeaderMenu
              items={langs}
              icon={<TranslateIcon sx={{ mr: 0.5 }} />}
              text={i18n.language.toUpperCase()}
              alwaysIcon={true}
            />
          </Box>
        </Toolbar>
      </AppBar>
      {modalOpen && <CreateBoardModal onModalClose={onModalClose} open={modalOpen} />}
    </>
  );
};

export default Header;
