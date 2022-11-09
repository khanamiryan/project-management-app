import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './layout.scss';

export default function Layout(): JSX.Element {
  return (
    <>
      <h1>Layout</h1>
      <NavLink
        to=""
        //className={({ isActive }) => 'nav-link' + (isActive ? ' active-link' : '')}
        end
      >
        Main Page
      </NavLink>
      <NavLink
        to="boards"
        //className={({ isActive }) => 'nav-link' + (isActive ? ' active-link' : '')}
      >
        Boards
      </NavLink>
      <NavLink
        to="profile"
        //className={({ isActive }) => 'nav-link' + (isActive ? ' active-link' : '')}
      >
        Profile
      </NavLink>
      <NavLink
        to="login"
        //className={({ isActive }) => 'nav-link' + (isActive ? ' active-link' : '')}
      >
        Sign In
      </NavLink>
      <NavLink
        to="registration"
        //className={({ isActive }) => 'nav-link' + (isActive ? ' active-link' : '')}
      >
        Sign Up
      </NavLink>
      <main>
        <Outlet />
      </main>
    </>
  );
}
