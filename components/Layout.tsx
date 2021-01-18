import React, { ReactNode, useContext } from 'react'
import Head from 'next/head'
import {
  AppBar,
  Button,
  Container,
  IconButton,
  makeStyles,
  Paper,
  Toolbar,
  Typography
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { AuthContext } from '../utils/auth/AuthContext';

type Props = {
  children?: ReactNode
  title?: string
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  }
}))

const Layout = ({ children, title }: Props): JSX.Element => {
  const classes = useStyles()
  const { user, login, logout } = useContext(AuthContext)

  return (
    <>
      {title && (
        <Head>
          <title>{title}</title>
        </Head>
      )}
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" className={classes.menuButton}>
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" className={classes.title}>
              Next.js Template
            </Typography>
            {user ? (
              <Button color="inherit" onClick={logout}>Logout</Button>
            ) : (
              <Button color="inherit" onClick={login}>Login</Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
      <Container>
        <Paper className={classes.paper}>
          {children}
        </Paper>
      </Container>
    </>
  )
}

export default Layout
