import Footer from 'components/footer';
import Header from 'components/header';
import React from 'react';
import { Outlet } from 'react-router-dom';
import './layout.scss';

export default function Layout(): JSX.Element {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
