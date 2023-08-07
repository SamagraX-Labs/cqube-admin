import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { StateProvider } from '../context';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateProvider>
      <Toaster/>
      <Component {...pageProps} />
    </StateProvider>
  );
}
