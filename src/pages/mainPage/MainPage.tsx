import { Avatar, Box, Card, Divider, Grid, List, ListItem, Stack, Typography } from '@mui/material';
import React from 'react';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import './mainPage.scss';

let theme = createTheme();
theme = responsiveFontSizes(theme);

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
          xs={12}
          sm={6}
          md={6}
          component="img"
          src="/assets/jpg/goal_800.jpg"
          alt="goal image"
        ></Grid>
      </Grid>

      <Divider sx={{ mt: 2, mb: 2 }} />

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
          src="/assets/jpg/board_3_800.jpg"
          alt="board"
          // sx={{ maxWidth: { sm: '500px' } }}
        ></Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Typography
            variant="h4"
            component="p"
            sx={{ textAlign: { sx: 'center', sm: 'justify' } }}
          >
            Airtable is your organizations single source of truth. Its how teams, data, and
            workflows are deeply connected by apps anyone can build.
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ mt: 2, mb: 2 }} />

      {/* section 3 */}
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
          src="/assets/jpg/board_2_800.jpg"
          alt="board"
          // sx={{ maxWidth: { sm: '500px' } }}
        ></Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Typography
            variant="h4"
            component="p"
            sx={{ textAlign: { sx: 'center', sm: 'justify' } }}
          >
            Airtable is your organizations single source of truth. Its how teams, data, and
            workflows are deeply connected by apps anyone can build.
          </Typography>
        </Grid>
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
          {[1, 2, 3].map((el) => {
            return (
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                key={el}
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
                    alt="Siarhei"
                    src="/assets/jpg/siarhei.jpg"
                    sx={{ width: 200, height: 200 }}
                    variant="rounded"
                  />
                  <Typography variant="h4">Siarhei</Typography>
                  <Typography variant="h6" component={'p'} color="text.secondary">
                    developer
                  </Typography>
                  <List>
                    <ListItem>Feature</ListItem>
                    <ListItem>Feature</ListItem>
                    <ListItem>Feature</ListItem>
                    <ListItem>Feature</ListItem>
                    <ListItem>Feature</ListItem>
                  </List>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
