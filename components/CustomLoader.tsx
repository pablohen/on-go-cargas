import React from 'react';
import Loader from 'react-loader-spinner';

interface Props {}

const CustomLoader = (props: Props) => {
  return (
    <div className="flex flex-col space-y-4">
      <p className="font-bold">Carregando...</p>
      <Loader type="Circles" color="#FBBF24" height={100} width={100} />
    </div>
  );
};

export default CustomLoader;
