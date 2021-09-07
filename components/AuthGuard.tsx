import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

interface Props {
  children: any;
}

const AuthGuard = ({ children }: Props) => {
  const router = useRouter();
  const accessToken = useSelector((state: any) => state.user.accessToken);

  return (
    <div>
      {!accessToken && router.push('/')}
      {children}
    </div>
  );
};

export default AuthGuard;
