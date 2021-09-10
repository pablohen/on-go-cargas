import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useDetalhesTerminal from './../../hooks/useDetalhesTerminal';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import OnGoBackground from '../../components/OnGoBackground';
import OnGoContainer from '../../components/OnGoContainer';
import { Formik, FormikHelpers } from 'formik';
import useCEP from './../../hooks/useCEP';
import { AtualizacaoTerminal } from '../../interfaces/AtualizacaoTerminal';
import CustomLoader from '../../components/CustomLoader';
import MainMenu from '../../components/MainMenu';
import onGoCargasService from '../../services/onGoCargasService';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

interface Props {}

const TerminalPage = (props: Props) => {
  const router = useRouter();
  const { terminalId } = router.query || {};
  const [CEP, setCEP] = useState<number>(0);
  const [dadosCEP] = useCEP(CEP);

  const [terminal, loadingTerminal] = useDetalhesTerminal(Number(terminalId));
  const accessToken = useSelector((state: any) => state.user.accessToken);

  const center = {
    lat: Number(
      dadosCEP?.location?.coordinates?.latitude || terminal?.endereco?.lat || 0
    ),
    lng: Number(
      dadosCEP?.location?.coordinates?.longitude || terminal?.endereco?.lng || 0
    ),
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || '',
  });

  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  const handleSubmit = async (
    accessToken: string,
    dadosTerminal: AtualizacaoTerminal
  ) => {
    const res = await onGoCargasService.updateTerminal(
      accessToken,
      dadosTerminal
    );
    console.log(res.status);

    if (res.status === 200) {
      toast.success(`Terminal ${dadosTerminal.nome} alterado com sucesso`, {
        position: 'bottom-center',
      });
    } else {
      toast.error(
        'Ocorreu um erro ao enviar. Verifique as informações e tente novamente.',
        {
          position: 'bottom-center',
        }
      );
    }
  };

  return (
    <OnGoBackground>
      <div className="space-y-4">
        <MainMenu />
        {loadingTerminal ? (
          <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="">
              <OnGoContainer>
                <CustomLoader />
              </OnGoContainer>
            </div>
          </div>
        ) : (
          <div className="px-4 pb-4 space-y-4">
            <Formik
              initialValues={{
                id: terminal.id,
                nome: terminal.nome,
                inscricaoEstadual: terminal.inscricaoEstadual,
                tipoPessoa: String(terminal.tipoPessoa),
                cpf: terminal.cpf,
                cnpj: terminal.cnpj,
                cep: terminal.endereco.cep,
                logradouro: terminal.endereco.logradouro,
                numero: terminal.endereco.numero,
                bairro: terminal.endereco.bairro,
                complemento: terminal.endereco.complemento,
                cidade: terminal.endereco.cidade,
                codCidadeIBGE: terminal.endereco.codCidadeIBGE,
                estado: terminal.endereco.siglaEstado,
                lat: terminal.endereco.lat,
                lng: terminal.endereco.lng,
              }}
              onSubmit={function (
                values: any,
                formikHelpers: FormikHelpers<any>
              ): void | Promise<any> {
                const dadosTerminal: AtualizacaoTerminal = {
                  Id: values.id,
                  idDonoCarga: 1,
                  nome: values.nome,
                  TipoPessoa: Number(values.tipoPessoa),
                  CPF: values.cpf,
                  CNPJ: values.cnpj,
                  InscricaoEstadual: values.inscricaoEstadual,
                  Endereco: {
                    id: 88,
                    logradouro: values.logradouro,
                    cep: values.cep,
                    bairro: values.bairro,
                    numero: values.numero,
                    CodCidadeIBGE: values.codCidadeIBGE,
                    complemento: values.complemento,
                    lat: values.lat,
                    lng: values.lng,
                    cidade: values.cidade,
                    estado: values.estado,
                    nomeEstado: values.nomeEstado,
                  },
                };

                handleSubmit(accessToken, dadosTerminal);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <OnGoContainer>
                    <p className="text-lg font-bold">Terminal</p>

                    <TextField
                      variant="outlined"
                      label="Nome do terminal"
                      name="nome"
                      value={values.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full"
                    />
                    <TextField
                      variant="outlined"
                      label="Inscrição Estadual"
                      name="inscricaoEstadual"
                      value={values.inscricaoEstadual}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full"
                    />
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Tipo de pessoa</FormLabel>
                      <RadioGroup
                        aria-label="tipo de pessoa"
                        name="tipoPessoa"
                        value={values.tipoPessoa}
                        onChange={handleChange}
                        row
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="Pessoa física"
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="Pessoa jurídica"
                        />
                      </RadioGroup>
                    </FormControl>

                    {values.tipoPessoa === '1' && (
                      <TextField
                        variant="outlined"
                        label="CPF"
                        name="cpf"
                        value={values.cpf}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full"
                      />
                    )}

                    {values.tipoPessoa === '2' && (
                      <TextField
                        variant="outlined"
                        label="CNPJ"
                        name="cnpj"
                        value={values.cnpj}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full"
                      />
                    )}
                  </OnGoContainer>
                  <OnGoContainer>
                    <p className="text-lg font-bold">Endereço</p>
                    <div className="flex space-x-4">
                      <TextField
                        variant="outlined"
                        label="CEP"
                        name="cep"
                        value={values.cep}
                        onChange={handleChange}
                        onBlur={(e: any) => {
                          handleBlur;
                          setCEP(values.cep);
                        }}
                        className="w-full"
                      />
                      {/* <button
                      className="rounded w-96 py-2 bg-yellow-400 font-bold shadow transform transition-all duration-300 hover:bg-yellow-300 hover:shadow-lg"
                      onClick={() => setCEP(values.cep)}
                    >
                      Buscar CEP
                    </button> */}
                    </div>
                    <TextField
                      variant="outlined"
                      label="Logradouro"
                      name="logradouro"
                      value={dadosCEP?.street || values.logradouro}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled
                      className="w-full"
                    />
                    <TextField
                      variant="outlined"
                      label="Número"
                      name="numero"
                      value={values.numero}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full"
                    />
                    <TextField
                      variant="outlined"
                      label="Bairro"
                      name="bairro"
                      value={dadosCEP?.neighborhood || values.bairro}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled
                      className="w-full"
                    />
                    <TextField
                      variant="outlined"
                      label="Complemento"
                      name="complemento"
                      value={values.complemento}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full"
                    />
                    <TextField
                      variant="outlined"
                      label="Cidade"
                      name="cidade"
                      value={dadosCEP?.city || values.cidade}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled
                      className="w-full"
                    />
                    <TextField
                      variant="outlined"
                      label="Código IBGE"
                      name="codCidadeIBGE"
                      value={values.codCidadeIBGE}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full"
                    />
                    <TextField
                      variant="outlined"
                      label="Estado"
                      name="estado"
                      value={dadosCEP?.state || values.estado}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled
                      className="w-full"
                    />
                    <input
                      type="submit"
                      className={`rounded w-full py-2 bg-yellow-400 font-bold shadow transform transition-all duration-300 hover:bg-yellow-300 hover:shadow-lg ${
                        isSubmitting &&
                        'bg-gray-400 hover:bg-gray-400 text-gray-600'
                      }`}
                      value="Enviar"
                      disabled={isSubmitting}
                    />
                    <Toaster />
                  </OnGoContainer>
                  {isLoaded && (
                    <OnGoContainer>
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={14}
                      >
                        <Marker position={center} />
                      </GoogleMap>

                      <div className="flex w-full space-x-4">
                        <TextField
                          variant="outlined"
                          label="Latitude"
                          value={
                            dadosCEP?.location?.coordinates?.latitude ||
                            values.lat ||
                            0
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled
                          className="w-full"
                        />
                        <TextField
                          variant="outlined"
                          label="Longitude"
                          value={
                            dadosCEP?.location?.coordinates?.longitude ||
                            values.lng ||
                            0
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled
                          className="w-full"
                        />
                      </div>
                    </OnGoContainer>
                  )}
                </form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </OnGoBackground>
  );
};

export default TerminalPage;
