import axios from 'axios';
import { AtualizacaoTerminal } from '../interfaces/AtualizacaoTerminal';

const api = axios.create({
  baseURL: 'https://api-homolog.ongocargas.com.br',
});

const login = async (login: string, password: string) => {
  let res = {};

  try {
    res = await api.post('/v1/public/api/Auth/login', {
      UserIdentifier: login,
      Password: password,
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.log(res);
    return res;
  }
};

const getTerminais = async (
  token: string,
  pesquisa: string = '',
  pageSize: number = 100,
  pageIndex: number = 0
) => {
  let res = {};

  try {
    res = await api.get('/v1/api/Terminal/get-terminal-listagem', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Ocp-Apim-Subscription-Key': process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY,
      },
      params: {
        pageSize,
        pageIndex,
        pesquisa,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.log(res);
    return res;
  }
};

const getDetalhesTerminal = async (token: string, id: number) => {
  let res = {};
  try {
    res = await api.get('/v1/api/Terminal/get-terminal-id', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Ocp-Apim-Subscription-Key': process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY,
      },
      params: { id },
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.log(res);
    return res;
  }
};

const createTerminal = async (
  token: string,
  dadosTerminal: AtualizacaoTerminal
) => {
  let res = {};

  try {
    res = await api.post('/v1/api/Terminal/save-terminal', dadosTerminal, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Ocp-Apim-Subscription-Key': process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.log(res);
    return res;
  }
};

const updateTerminal = async (
  token: string,
  dadosTerminal: AtualizacaoTerminal
) => {
  let res: any = {};

  try {
    res = await api.post('/v1/api/Terminal/alterar-terminal', dadosTerminal, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Ocp-Apim-Subscription-Key': process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY,
      },
    });
    if (res.status === 200)
      alert(`Terminal ${dadosTerminal.nome} alterado com sucesso`);
  } catch (error) {
    console.log(error);
    alert('Ocorreu um erro');
  } finally {
    return res;
  }
};

const onGoCargasService = {
  api,
  login,
  getTerminais,
  getDetalhesTerminal,
  createTerminal,
  updateTerminal,
};

export default onGoCargasService;
