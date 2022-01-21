import '../styles/global.scss'

import { AppProps } from 'next/app'
import { Header } from '../components/header'
import {SessionProvider} from 'next-auth/react'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session= {pageProps.session}>
      <Header />{/*Header vai tá em tds as páginas, então já deixa aqui */}
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
