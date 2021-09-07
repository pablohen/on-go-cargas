import React from 'react';

interface Props {
  children: any;
}

const OnGoBackground = ({ children }: Props) => {
  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen px-4"
      style={{
        background: 'url(/default-bg.jpg) center center/cover no-repeat',
      }}
    >
      {children}
    </div>
  );
};

export default OnGoBackground;
