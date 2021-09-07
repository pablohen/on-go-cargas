import React, { useEffect, useState } from 'react';
import onGoCargasService from '../services/onGoCargasService';
import { useSelector } from 'react-redux';
import { DetalhesTerminal } from './../interfaces/DetalhesTerminal';

const useDetalhesTerminal = (id: number): [DetalhesTerminal, Boolean] => {
  const [terminal, setTerminal] = useState<DetalhesTerminal | any>({});
  const [loading, setLoading] = useState<Boolean>(true);
  const accessToken = useSelector((state: any) => state.user.accessToken);

  useEffect(() => {
    const getDetalhes = async () => {
      const res: any = await onGoCargasService.getDetalhesTerminal(
        accessToken,
        id
      );
      const detalhes: DetalhesTerminal = await res.data.data;
      setTerminal(detalhes);
      setLoading(false);
    };

    getDetalhes();
  }, [accessToken, id]);

  return [terminal, loading];
};

export default useDetalhesTerminal;
