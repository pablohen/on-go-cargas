import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';
import { store, persistor } from '../store/';
import { PersistGate } from 'redux-persist/integration/react';
import AuthGuard from '../components/AuthGuard';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
export default MyApp;
