export interface Terminal {
  Id: number;
  idDonoCarga: number;
  nome: string;
  TipoPessoa: number;
  CPF: string | null;
  CNPJ: string;
  InscricaoEstadual: string | null;
  Endereco: {
    id: number;
    logradouro: string;
    cep: string;
    bairro: string;
    numero: string;
    CodCidadeIBGE: number;
    complemento: string;
    lat: string;
    lng: string;
    cidade: string;
    estado: string;
    nomeEstado: string;
  };
}
