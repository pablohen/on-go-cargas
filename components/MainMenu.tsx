import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import { LogoutIcon, DocumentSearchIcon } from '@heroicons/react/outline';

interface Props {}

const MainMenu = (props: Props) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex items-center bg-yellow-500 dark:bg-gray-900">
      <div className="flex justify-between items-center  w-full">
        <div>
          <Link href="/terminais" passHref>
            <a className="flex justify-center items-center text-gray-200 font-bold hover:text-white hover:bg-yellow-400 drop-shadow p-4 transform transition-all duration-200 ease-in-out">
              <DocumentSearchIcon className="h-6 mr-2" />
              Terminais
            </a>
          </Link>
        </div>

        <div>
          <button
            className="flex justify-center items-center text-gray-200 font-bold hover:text-white hover:bg-yellow-400 drop-shadow p-4 transform transition-all duration-200 ease-in-out"
            onClick={handleLogout}
          >
            <LogoutIcon className="h-6 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
