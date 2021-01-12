import type { AppProps } from 'next/app'
import { AuthProvider } from '../utils/auth/AuthContext'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default App
