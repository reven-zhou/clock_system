import '../styles/globals.css'
import Layout from '../components/Layout'
import 'tailwindcss/tailwind.css';
import { useState,useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);  

  if (isSSR) return null;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
