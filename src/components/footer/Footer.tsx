import { Box, Link, Grid, Paper, Typography, Card, Avatar, Container, Stack } from '@mui/material';
import React from 'react';
import './footer.scss';

const Footer = () => {
  return (
    <Box
      className="footer"
      component="footer"
      sx={{
        py: 1,
        px: 1,
        mt: 'auto',
        zIndex: 1,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: (theme) => theme.palette.grey[800],
      }}
      // elevation={3}
    >
      <Grid container spacing={1}>
        <Grid item alignItems={'center'} display={'flex'}>
          <Typography className={'footer-year'}>© 2022</Typography>
        </Grid>

        <Grid item flex={1} alignItems={'center'} display={'flex'} justifyContent={'center'}>
          <Stack direction={'row'} spacing={1}>
            <Link
              sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
              href="https://github.com/khanamiryan"
              underline="none"
              target="_blank"
              className="footer-link"
            >
              <Avatar
                // display={{ sx: 'none', md: 'none' }}
                alt="Ashot Khanamiryan"
                src={'https://avatars.githubusercontent.com/u/6542341?s=64&v=4'}
                sx={{ mr: { md: 1 }, width: { xs: 24, md: 32 }, height: { xs: 24, md: 32 } }}
              />
              <Typography display={{ xs: 'none', md: 'block' }}>Ashot Khanamiryan</Typography>
            </Link>

            <Link
              sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
              href="https://github.com/siarheiha"
              underline="none"
              target="_blank"
              className="footer-link"
            >
              <Avatar
                // display={{ sx: 'none', md: 'none' }}
                alt="Siarhei Hancharyk"
                src={'https://avatars.githubusercontent.com/u/95608052?s=64&v=4'}
                sx={{ mr: { md: 1 }, width: { xs: 24, md: 32 }, height: { xs: 24, md: 32 } }}
              />

              <Typography display={{ xs: 'none', md: 'block' }}>Siarhei Hancharyk</Typography>
            </Link>

            <Link
              href="https://github.com/utyfjs"
              underline="none"
              target="_blank"
              className="footer-link"
              sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
            >
              <Avatar
                // display={{ sx: 'none', md: 'none' }}
                alt="Henadzi Suhakou"
                src={'https://avatars.githubusercontent.com/u/79808010?s=64&v=4'}
                sx={{ mr: { md: 1 }, width: { xs: 24, md: 32 }, height: { xs: 24, md: 32 } }}
              />
              <Typography display={{ xs: 'none', md: 'block' }}>Henadzi Suhakou</Typography>
            </Link>
          </Stack>
        </Grid>
        <Grid
          item
          textAlign={'right'}
          alignItems={'center'}
          display={'flex'}
          justifyContent={'end'}
        >
          <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
            <img src="/assets/svg/rs_school.svg" alt="rss school" className="icon-rsschool" />
          </a>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
