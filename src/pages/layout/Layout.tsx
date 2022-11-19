import Footer from 'components/footer';
import Header from 'components/header';
import Toast from 'components/Toast/Toast';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from 'store/redux.hooks';
import './layout.scss';

export default function Layout(): JSX.Element {
  const state = useAppSelector((state) => state.toast);

  return (
    <>
      <Header />
      <main>
        <Outlet />
        <Toast {...state} />
      </main>
      <Footer />
    </>
  );
}
