import { useEffect, useState } from 'react';
import { CEP } from '../interfaces/CEP';
import brasilApiService from '../services/brasilApiService';

const useCEP = (cep: number) => {
  const [dados, setDados] = useState<CEP>();

  useEffect(() => {
    if (cep && cep !== 0) {
      const getCEP = async () => {
        const res: any = await brasilApiService.getCEP(cep);
        const dadosCep: CEP = res.data;
        setDados(dadosCep);
      };

      getCEP();
    }
  }, [cep]);

  return [dados];
};

export default useCEP;
