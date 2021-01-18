import { useContext } from 'react'
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core'
import Layout from '../components/Layout'
import { AuthContext } from '../utils/auth/AuthContext'
import withLoginRequired from '../utils/auth/withLoginRequired'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    }
  })
)

const Index = () => {
  const classes = useStyles()
  const { user, logout } = useContext(AuthContext)

  if (!user) {
    return <>loading...</>
  }

  return (
    <Layout>
      <p>You&apos;re signed in. Email: {user.email}</p>
      <Button onClick={logout} variant="contained" color="primary" className={classes.button}>
        Logout
      </Button>
    </Layout>
  )
}

export default withLoginRequired(Index)
