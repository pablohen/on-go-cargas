import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AuthGuard from './../components/AuthGuard';
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
        res?.data?.data?.data.map((terminal: any) => {
          const { id, nome, endereco } = terminal;
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
    { field: 'nome', headerName: 'Terminal' },
    {
      field: 'cidade',
      headerName: 'Cidade',
      editable: true,
    },
    {
      field: 'nomeEstado',
      headerName: 'Estado',
      editable: true,
    },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  const listaTerminais = terminais?.map((terminal) => {
    const id = terminal.Id;
    const { nome, Endereco } = terminal;
    const { cidade, nomeEstado } = Endereco || {};

    return { id, nome, cidade, nomeEstado };
  });

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
                rows={terminais}
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
