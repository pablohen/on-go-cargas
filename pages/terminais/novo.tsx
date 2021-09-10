import React, { useState } from 'react';

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
import MainMenu from '../../components/MainMenu';
import onGoCargasService from '../../services/onGoCargasService';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

interface Props {}

const NovoTerminalPage = (props: Props) => {
  const [CEP, setCEP] = useState<number>(0);
  const [dadosCEP] = useCEP(CEP);

  const accessToken = useSelector((state: any) => state.user.accessToken);

  const center = {
    lat: Number(dadosCEP?.location?.coordinates?.latitude || 0),
    lng: Number(dadosCEP?.location?.coordinates?.longitude || 0),
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
    const res: any = await onGoCargasService.createTerminal(
      accessToken,
      dadosTerminal
    );
    console.log(res);
    console.log(dadosTerminal);

    if (res.status === 200) {
      toast.success(`Terminal ${dadosTerminal.nome} cadastrado com sucesso`, {
        position: 'bottom-center',
      });
    } else {
      toast.error(res.data?.[0].errorCode, {
        position: 'bottom-center',
      });
    }
  };

  return (
    <OnGoBackground>
      <div className="space-y-4">
        <MainMenu />
        <div className="px-4 pb-4 space-y-4">
          <Formik
            initialValues={{
              id: '',
              nome: '',
              inscricaoEstadual: '',
              tipoPessoa: String(''),
              cpf: '',
              cnpj: '',
              cep: '',
              logradouro: '',
              numero: '',
              bairro: '',
              complemento: '',
              cidade: '',
              codCidadeIBGE: '',
              estado: '',
              lat: '',
              lng: '',
              nomeEstado: '',
            }}
            onSubmit={function (
              values: any,
              formikHelpers: FormikHelpers<any>
            ): void | Promise<any> {
              const dadosTerminal: AtualizacaoTerminal = {
                Id: Number(0),
                idDonoCarga: Number(0),
                nome: values.nome,
                TipoPessoa: Number(values.tipoPessoa),
                CPF: values.cpf,
                CNPJ: values.cnpj,
                InscricaoEstadual: Number(values.inscricaoEstadual),
                Endereco: {
                  id: Number(0),
                  logradouro: dadosCEP?.street || values.logradouro,
                  cep: values.cep,
                  bairro: dadosCEP?.neighborhood || values.bairro,
                  numero: values.numero,
                  CodCidadeIBGE: Number(values.codCidadeIBGE),
                  complemento: values.complemento,
                  lat: Number(
                    dadosCEP?.location?.coordinates?.latitude || values.lat
                  ),
                  lng: Number(
                    dadosCEP?.location?.coordinates?.longitude || values.lng
                  ),
                  cidade: dadosCEP?.city || values.cidade,
                  estado: dadosCEP?.state || values.estado,
                  nomeEstado: dadosCEP?.state || values.nomeEstado,
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
                  <p className="text-lg font-bold">Novo Terminal</p>

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
      </div>
    </OnGoBackground>
  );
};

export default NovoTerminalPage;
