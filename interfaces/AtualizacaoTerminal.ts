export interface AtualizacaoTerminal {
  Id: number;
  idDonoCarga: number;
  nome: string;
  TipoPessoa: number;
  CPF: string | null;
  CNPJ: string;
  InscricaoEstadual: number | null;
  Endereco: {
    id: number;
    logradouro: string;
    cep: string;
    bairro: string;
    numero: string;
    CodCidadeIBGE: number;
    complemento: string;
    lat: number;
    lng: number;
    cidade: string;
    estado: string;
    nomeEstado: string;
  };
}
