import type { AppProps } from 'next/app'
import { CssBaseline } from '@material-ui/core'
import { AuthProvider } from '../utils/auth/AuthContext'
import Head from 'next/head'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Next.js with Firabase and TypeScript Template</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <CssBaseline>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </CssBaseline>
    </>
  )
}

export default App
