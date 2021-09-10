import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

interface Props {
  children: any;
}

const AuthGuard = ({ children }: Props) => {
  const accessToken = useSelector((state: any) => state.user.accessToken);
  const router = useRouter();

  if (!accessToken && router.pathname !== '/login') {
    router.push('/login');
  }

  if (accessToken && router.pathname === '/login') {
    router.push('/terminais');
  }

  return children;
};

export default AuthGuard;
