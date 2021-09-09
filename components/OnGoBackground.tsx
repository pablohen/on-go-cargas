import React from 'react';

interface Props {
  children: any;
}

const OnGoBackground = ({ children }: Props) => {
  return (
    <div
      className="flex flex-col min-h-screen w-full"
      style={{
        background: 'url(/default-bg.jpg) center center/cover no-repeat',
      }}
    >
      {children}
    </div>
  );
};

export default OnGoBackground;
