import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice';
import onGoCargasService from '../services/onGoCargasService';
import { useRouter } from 'next/router';
import OnGoContainer from '../components/OnGoContainer';

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
    } finally {
      console.log(res);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen px-4"
      style={{
        background: 'url(/default-bg.jpg) center center/cover no-repeat',
      }}
    >
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
            className="rounded w-full py-2 bg-yellow-400 font-bold shadow transform transition-all duration-300 hover:bg-yellow-300 hover:shadow-lg hover:scale-105"
            type="submit"
          >
            Login
          </button>
        </form>
      </OnGoContainer>
    </div>
  );
};

export default LoginPage;
