// noinspection AllyJsxHardcodedStringInspection

import { Box, Link, Grid, Typography, Stack } from '@mui/material';
import React from 'react';
import './footer.scss';
import Author from './Author/Author';

const Footer = () => {
  return (
    <Box className="footer" component="footer">
      <Grid container spacing={1}>
        <Grid item alignItems={'center'} display={'flex'}>
          <Typography className={'footer-year'}>© 2022</Typography>
        </Grid>

        <Grid item flex={1} alignItems={'center'} display={'flex'} justifyContent={'center'}>
          <Stack direction={'row'} spacing={1}>
            <Author
              url="https://github.com/khanamiryan"
              name="Ashot Khanamiryan"
              imageSrc="https://avatars.githubusercontent.com/u/6542341?s=64&v=4"
            />
            <Author
              url="https://github.com/siarheiha"
              name="Siarhei Hancharyk"
              imageSrc="https://avatars.githubusercontent.com/u/95608052?s=64&v=4"
            />

            <Author
              url="https://github.com/utyfjs"
              name="Henadzi Suhakou"
              imageSrc="https://avatars.githubusercontent.com/u/79808010?s=64&v=4"
            />
          </Stack>
        </Grid>
        <Grid
          item
          textAlign={'right'}
          alignItems={'center'}
          display={'flex'}
          justifyContent={'end'}
        >
          <Link href="https://rs.school/react/" target="_blank" rel="noreferrer">
            <img src="/assets/svg/rs_school.svg" alt="rss school" className="icon-rsschool" />
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
