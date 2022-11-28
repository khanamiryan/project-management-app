import { Avatar, Box, Button, Card, Divider, Grid, Link, Typography } from '@mui/material';
import React from 'react';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import './mainPage.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const developers = [
  {
    url: 'https://github.com/khanamiryan',
    name: 'Ashot Khanamiryan',
    imageSrc: 'https://avatars.githubusercontent.com/u/6542341?s=64&v=4',
    role: 'team lead, developer',
  },
  {
    url: 'https://github.com/utyfjs',
    name: 'Henadzi Suhakou',
    imageSrc: 'https://avatars.githubusercontent.com/u/79808010?s=64&v=4',
    role: 'developer',
  },
  {
    url: 'https://github.com/siarheiha',
    name: 'Siarhei Hancharyk',
    imageSrc: '/assets/jpg/siarhei.jpg',
    role: 'developer',
  },
];

const firstTextBlock =
  '"The SuperBoards" is by far the best application for project management*. The unsurpassed functionality of our app for team work management will allow you to plan and control every stage of the project.';
const footnote = '*According to the developers of this application.';
const secondTextBlock =
  'Create as many columns as you want and fill them with any number of tasks. You can add team members to boards and tasks. You can even drag and drop elements with the mouse if that makes you happy.';

export default function MainPage(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} justifyContent="center">
        <Grid
          item
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-evenly"
          xs={12}
          sm={6}
          md={6}
        >
          <Box>
            <Typography variant="h2" textAlign="center">
              Super boards
            </Typography>
            <Typography variant="h4" textAlign="center">
              superpower for you projects
            </Typography>
          </Box>
          <Box textAlign={'center'}>
            <Button
              variant="outlined"
              sx={{ m: 1, minWidth: '150px' }}
              onClick={() => navigate('/login')}
            >
              {t('form.fields.signIn')}
            </Button>
            <Button
              variant="contained"
              sx={{ m: 1, minWidth: '150px' }}
              onClick={() => navigate('/registration')}
            >
              {t('form.fields.signup')}
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={8}
          sm={4}
          md={4}
          component="img"
          src="/assets/jpg/goal_800.jpg"
          alt="goal"
          height="auto"
        ></Grid>
      </Grid>

      <Divider />

      {/* section 2 */}

      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems={'center'}
        flexWrap="wrap-reverse"
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          component="img"
          src="/assets/jpg/board_4_800.jpg"
          alt="board"
        ></Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Typography
            variant="h5"
            component="p"
            sx={{ textAlign: { xs: 'center', sm: 'justify' } }}
          >
            {firstTextBlock}
          </Typography>
          <Divider />
          <Typography
            variant="body1"
            component="p"
            color={'text.secondary'}
            sx={{ textAlign: { xs: 'center', sm: 'justify' } }}
          >
            {footnote}
          </Typography>
        </Grid>
      </Grid>

      <Divider />

      {/* section 3 */}

      <Grid container spacing={2} justifyContent="center" alignItems={'center'}>
        <Grid item xs={12} sm={6} md={6}>
          <Typography
            variant="h5"
            component="p"
            sx={{ textAlign: { xs: 'center', sm: 'justify' } }}
          >
            {secondTextBlock}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          component="img"
          src="/assets/jpg/board_3_800.jpg"
          alt="board"
        ></Grid>
      </Grid>

      <Divider sx={{ mt: 2, mb: 2 }} />

      {/* section 4 */}
      <Box>
        <Typography variant="h4" textAlign={'center'} sx={{ m: 4 }}>
          Developers team{' '}
        </Typography>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems={'center'}
          flexWrap="wrap-reverse"
        >
          {developers.map(({ name, role, imageSrc, url }) => {
            return (
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                key={name}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '280px',
                    p: 4,
                  }}
                >
                  <Avatar
                    alt="photo"
                    src={imageSrc}
                    sx={{ width: 200, height: 200 }}
                    variant="rounded"
                  />
                  <Typography variant="h4">{name.split(' ')[0]}</Typography>
                  <Typography variant="h6" component={'p'} color="text.secondary">
                    {role}
                  </Typography>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Divider sx={{ mt: 2, mb: 2 }} />

        <Typography variant="h6" component={'p'} textAlign="center">
          This app was created as the final task of the{' '}
          {
            <Link href="https://rs.school/react/" target="_blank">
              React course of the Rolling Scopes School.
            </Link>
          }
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
