import axios from 'axios';

const api = axios.create({
  baseURL: 'https://brasilapi.com.br/api',
});

const getCEP = async (cep: number) => {
  let res = {};
  try {
    res = await api.get(`/cep/v2/${cep}`);
  } catch (error) {
    console.log(error);
  } finally {
    return res;
  }
};

const brasilApiService = {
  getCEP,
};

export default brasilApiService;
