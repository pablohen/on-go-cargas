import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';
import onGoCargasService from '../services/onGoCargasService';
import { AtualizacaoTerminal } from '../interfaces/AtualizacaoTerminal';
import { useRouter } from 'next/router';
import OnGoContainer from './../components/OnGoContainer';
import OnGoBackground from './../components/OnGoBackground';
import { TextField } from '@material-ui/core';
import MainMenu from '../components/MainMenu';

interface Props {}

const TerminaisPage = (props: Props) => {
  const token = useSelector((state: any) => state.user.accessToken);
  const [terminais, setTerminais] = useState<AtualizacaoTerminal[]>([]);
  const [pesquisa, setPesquisa] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const getT = async () => {
      const res: any = await onGoCargasService.getTerminais(token, pesquisa);
      console.log(res);
      setTerminais(
        res?.data?.data?.data?.map((terminal: any) => {
          const { id, nome, endereco } = terminal || {};
          const { cidade, nomeEstado } = endereco || {};

          return { id, nome, cidade, nomeEstado };
        })
      );
    };

    if (token) {
      getT();
    }
  }, [token, pesquisa]);

  useEffect(() => {
    console.log(terminais);
  }, [terminais]);

  const columns = [
    { field: 'nome', headerName: 'Terminal', flex: 1 },
    {
      field: 'cidade',
      headerName: 'Cidade',
      flex: 1,
    },
    {
      field: 'nomeEstado',
      headerName: 'Estado',
      flex: 1,
    },
  ];

  return (
    <OnGoBackground>
      <div className="space-y-4">
        <MainMenu />

        <div className="px-4">
          <OnGoContainer>
            <p className="text-lg font-bold">Terminais</p>
            <TextField
              label="Pesquisar"
              variant="outlined"
              value={pesquisa}
              onChange={(e) => setPesquisa(e.currentTarget.value)}
            />
            <div className="w-full h-96">
              <DataGrid
                columns={columns}
                rows={terminais || []}
                pageSize={10}
                onRowClick={(item) => router.push(`terminais/${item.id}`)}
              />
            </div>
          </OnGoContainer>
        </div>
      </div>
    </OnGoBackground>
  );
};

export default TerminaisPage;
