import React from 'react';

interface Props {
  children: any;
}

const OnGoContainer = ({ children }: Props) => {
  return (
    <div className="w-full p-4 rounded-xl bg-gray-100/80 dark:bg-gray-600/70 backdrop-blur-lg shadow-lg space-y-4">
      {children}
    </div>
  );
};

export default OnGoContainer;
