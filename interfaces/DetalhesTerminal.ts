export interface DetalhesTerminal {
  id: number;
  nome: string;
  endereco: {
    id: number;
    logradouro: string;
    numero: string;
    bairro: string;
    complemento: string;
    cep: string;
    lat: string;
    lng: string;
    cidade: string;
    estado: number;
    siglaEstado: string;
    nomeEstado: string;
    codCidadeIBGE: number;
  };
  idEndereco: number;
  donoCarga?: {
    id: number;
    nomeFantasia: string;
    razaoSocial: string;
    cnpj: string;
    email: string;
    modoPagamento: number;
    inscricaoEstadual: number;
    modoDescarregamento: number;
    ativo: boolean;
    tipo: number;
    ddi: string;
    ddd: string;
    numero: string;
    endereco: string | null;
    idEndereco: number;
    informarKM: boolean;
    socio: [];
    documento: [];
    donoCargaRepasse: [];
  };
  idDonoCarga?: number;
  inscricaoEstadual: number;
  idProdutor?: number | null;
  tipoPessoa: number;
  cpf: string | null;
  cnpj: string;
}
