import { Container, Link } from '@mui/material';
import React from 'react';
import './footer.scss';

const Footer = () => {
  return (
    <Container
      component="footer"
      sx={{
        position: 'absolute',
        bottom: '0',
        backgroundColor: '#1976d2',
        minHeight: 48,
        maxHeight: 64,
        display: 'flex',
        justifyContent: 'space-between',
      }}
      className="footer"
    >
      <div className={'footer-year'}>
        <p>© 2022</p>
      </div>
      <Link
        href="https://github.com/khanamiryan"
        underline="none"
        target="_blank"
        sx={{ maxWidth: 50, color: '#fff' }}
      >
        Ashot Khanamiryan
      </Link>
      <Link
        href="https://github.com/siarheiha"
        underline="none"
        target="_blank"
        sx={{ maxWidth: 50, color: '#fff' }}
      >
        Siarhei Hancharyk
      </Link>
      <Link
        href="https://github.com/utyfjs"
        underline="none"
        target="_blank"
        sx={{ maxWidth: 50, color: '#fff' }}
      >
        Henadzi Suhakou
      </Link>
      <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
        <img src="/assets/svg/rs_school.svg" alt="rss school" className="icon-rsschool" />
      </a>
    </Container>
  );
};

export default Footer;
