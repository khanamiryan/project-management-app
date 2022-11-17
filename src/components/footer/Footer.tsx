import { Box, Link } from '@mui/material';
import React from 'react';
import './footer.scss';

const Footer = () => {
  return (
    <Box component="footer" className="footer">
      <div className={'footer-year'}>
        <p>© 2022</p>
      </div>
      <Link
        href="https://github.com/khanamiryan"
        underline="none"
        target="_blank"
        className="footer-link"
      >
        Ashot Khanamiryan
      </Link>
      <Link
        href="https://github.com/siarheiha"
        underline="none"
        target="_blank"
        className="footer-link"
      >
        Siarhei Hancharyk
      </Link>
      <Link
        href="https://github.com/utyfjs"
        underline="none"
        target="_blank"
        className="footer-link"
      >
        Henadzi Suhakou
      </Link>
      <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
        <img src="/assets/svg/rs_school.svg" alt="rss school" className="icon-rsschool" />
      </a>
    </Box>
  );
};

export default Footer;
