import React from 'react';
import { useSelector } from 'react-redux';

interface Props {
  children: any;
}

const AuthGuard = ({ children }: Props) => {
  const accessToken = useSelector((state: any) => state.user.accessToken);

  if (!accessToken && window.location.pathname !== '/login') {
    window.location.pathname = '/login';
  }

  if (accessToken && window.location.pathname === '/login') {
    window.location.pathname = '/terminais';
  }

  return children;
};

export default AuthGuard;
