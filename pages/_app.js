import '../styles/globals.css'
import Layout from '../components/Layout'
import 'tailwindcss/tailwind.css';
import { useState, useEffect } from 'react';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 2000,
  // offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

function MyApp({ Component, pageProps }) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AlertProvider>

  )
}

export default MyApp
