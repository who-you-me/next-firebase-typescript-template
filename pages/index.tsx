import { useContext } from 'react'
import Layout from '../components/Layout'
import { AuthContext } from '../utils/auth/AuthContext'
import withLoginRequired from '../utils/auth/withLoginRequired'

const Index = () => {
  const { user, logout } = useContext(AuthContext)

  if (!user) {
    return <>loading...</>
  }

  return (
    <Layout>
      <p>You're signed in. Email: {user.email}</p>
      <p
        style={{
          display: 'inline-block',
          color: 'blue',
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
        onClick={() => logout()}
      >
        Log out
      </p>
    </Layout>
  )
}

export default withLoginRequired(Index)
