import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Layout from '../components/Layout';
import { AuthContext } from '../utils/auth/AuthContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    }
  })
)

const Login = (): JSX.Element => {
  const classes = useStyles()
  const router = useRouter()
  const { user, login } = useContext(AuthContext)

  if (user) {
    router.push('/')
  }

  return (
    <Layout>
      <Button onClick={login} variant="contained" color="primary" className={classes.button}>
        Login
      </Button>
    </Layout>
  )
}

export default Login
