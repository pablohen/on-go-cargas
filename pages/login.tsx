import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import onGoCargasService from '../services/onGoCargasService';
import { useRouter } from 'next/router';
import OnGoContainer from '../components/OnGoContainer';
import OnGoBackground from './../components/OnGoBackground';
import { LoginIcon } from '@heroicons/react/outline';

interface Props {}

const LoginPage = (props: Props) => {
  const [email, setEmail] = useState('vagas@ongo.com.br');
  const [password, setPassword] = useState('Vagas1a2b');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    let res: any = {};

    try {
      res = await onGoCargasService.login(email, password);
      dispatch(login(res.data));
      router.push('/terminais');
    } catch (error) {
      console.log(error);
      alert('Login ou senha inválidos');
    } finally {
      console.log(res);
    }
  };

  return (
    <OnGoBackground>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="max-w-max">
          <OnGoContainer>
            <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
              <p className="text-xl text-center">On Go Cargas</p>
              <input
                type="text"
                placeholder="login"
                className="px-2 py-1 rounded outline-none border-2 border-transparent focus:border-yellow-400"
                defaultValue={email}
              />
              <input
                type="password"
                placeholder="senha"
                className="px-2 py-1 rounded outline-none border-2 border-transparent focus:border-yellow-400"
                defaultValue={password}
              />
              <button
                className="flex justify-center items-center rounded w-full py-2 bg-yellow-400 font-bold shadow transform transition-all duration-300 hover:bg-yellow-300 hover:shadow-lg"
                type="submit"
              >
                <LoginIcon className="h-6 mr-2" />
                Login
              </button>
            </form>
          </OnGoContainer>
        </div>
      </div>
    </OnGoBackground>
  );
};

export default LoginPage;
