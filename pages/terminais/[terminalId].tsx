import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useDetalhesTerminal from './../../hooks/useDetalhesTerminal';
import { TextField } from '@material-ui/core';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import OnGoBackground from '../../components/OnGoBackground';
import OnGoContainer from '../../components/OnGoContainer';
import { Formik, FormikHelpers, useFormik } from 'formik';
import useCEP from './../../hooks/useCEP';
import { Terminal } from '../../interfaces/Terminal';

interface Props {}

const TerminalPage = (props: Props) => {
  const router = useRouter();
  const { terminalId } = router.query || {};
  const [CEP, setCEP] = useState(13484171);
  const [dadosCEP] = useCEP(CEP);

  useEffect(() => {
    console.log(dadosCEP);
  }, [dadosCEP]);

  const [terminal, loadingTerminal] = useDetalhesTerminal(Number(terminalId));
  const center = {
    lat: Number(terminal?.endereco?.lat),
    lng: Number(terminal?.endereco?.lng),
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || '',
  });

  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  useEffect(() => {
    if (loadingTerminal === false) {
      console.log(terminal);
    }
  }, [loadingTerminal, terminal]);

  return (
    <OnGoBackground>
      {loadingTerminal ? (
        <div>Carregando</div>
      ) : (
        <div className="p-4 space-y-4">
          <Formik
            initialValues={{
              id: terminal.id,
              nome: terminal.nome,
              inscricaoEstadual: terminal.inscricaoEstadual,
              tipoPessoa: terminal.tipoPessoa,
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
              const dadosTerminal: any = {
                Id: values.id,
                idDonoCarga: 1,
                nome: values.nome,
                TipoPessoa: values.tipoPessoa,
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
              console.log(dadosTerminal);
              throw new Error('Function not implemented.');
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
                    label="Nome do Terminal"
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
                  <TextField
                    variant="outlined"
                    label="Tipo pessoa"
                    name="tipoPessoa"
                    value={values.tipoPessoa}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full"
                  />
                  <TextField
                    variant="outlined"
                    label="CPF"
                    name="cpf"
                    value={values.cpf}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full"
                  />
                  <TextField
                    variant="outlined"
                    label="CNPJ"
                    name="cnpj"
                    value={values.cnpj}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full"
                  />
                </OnGoContainer>
                <OnGoContainer>
                  <p className="text-lg font-bold">Endereço</p>
                  <TextField
                    variant="outlined"
                    label="CEP"
                    name="cep"
                    value={values.cep}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full"
                  />
                  <TextField
                    variant="outlined"
                    label="Logradouro"
                    name="logradouro"
                    value={values.logradouro}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    value={values.bairro}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    value={values.cidade}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    value={values.estado}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full"
                  />
                  <input
                    type="submit"
                    className="rounded w-full py-2 bg-yellow-400 font-bold shadow transform transition-all duration-300 hover:bg-yellow-300 hover:shadow-lg hover:scale-105"
                    value="Enviar"
                    disabled={isSubmitting}
                  />
                </OnGoContainer>
                {isLoaded && (
                  <OnGoContainer>
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={center}
                      zoom={10}
                    >
                      <Marker position={center} />
                    </GoogleMap>

                    <div className="flex w-full space-x-4">
                      <TextField
                        variant="outlined"
                        label="Latitude"
                        value={values.lat}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                        className="w-full"
                      />
                      <TextField
                        variant="outlined"
                        label="Longitude"
                        value={values.lng}
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
    </OnGoBackground>
  );
};

export default TerminalPage;
