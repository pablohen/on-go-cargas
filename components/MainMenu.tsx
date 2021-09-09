import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';

interface Props {}

const MainMenu = (props: Props) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex space-x-4 items-center bg-white dark:bg-gray-900 text-gray-500 p-4">
      <Link href="/terminais" passHref>
        <a>Terminais</a>
      </Link>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default MainMenu;
