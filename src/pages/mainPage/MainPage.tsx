import {
  Avatar,
  Box,
  Card,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import './mainPage.scss';
import { text } from 'stream/consumers';

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
  '"The SuperBoards" is by far the best application for project management*. The unsurpassed functionality of our application for team work management will allow you to plan and control every stage of the project.';
const footnote = '*According to the developers of this application.';

export default function MainPage(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} justifyContent="center">
        <Grid
          item
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          xs={12}
          sm={6}
          md={6}
        >
          <Typography variant="h2" textAlign="center">
            Super boards
          </Typography>
          <Typography variant="h4" textAlign="center">
            superpower for you projects
          </Typography>
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
            variant="h4"
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
            variant="h4"
            component="p"
            sx={{ textAlign: { xs: 'center', sm: 'justify' } }}
          >
            Airtable is your organizations single source of truth. Its how teams, data, and
            workflows are deeply connected by apps anyone can build.
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

        <Divider />

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
