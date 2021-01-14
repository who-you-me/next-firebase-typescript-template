import { useContext } from 'react';
import Layout from '../components/Layout';
import { AuthContext } from '../utils/auth/AuthContext';

const Login = (): JSX.Element => {
  const { login } = useContext(AuthContext)

  return (
    <Layout>
      <button onClick={login}>Login</button>
    </Layout>
  )
}

export default Login
