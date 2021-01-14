import { createContext, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import 'firebase/auth'
import { User } from '../../interfaces'
import initFirebase from '../auth/initFirebase'
import { getUserFromCookie, removeUserCookie, setUserCookie } from './userCookies'
import { mapUserData } from './mapUserData'

initFirebase()

interface IAuthContext {
  user: User | null,
  login: () => void,
  logout: () => void
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const AuthProvider = (props: any): JSX.Element => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const provider = new firebase.auth.GoogleAuthProvider();
  const login = () => {
    firebase.auth().signInWithPopup(provider).then(async (result) => {
      if (result.user) {
        const userData = await mapUserData(result.user)
        setUserCookie(userData)
        router.push('/')
      }
    });
  }

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        router.push('/login')
      })
      .catch((e) => {
        console.error(e)
      })
  }

  useEffect(() => {
    const cancelAuthListener = firebase
      .auth()
      .onIdTokenChanged(async (user) => {
        if (user) {
          const userData = await mapUserData(user)
          setUserCookie(userData)
          setUser(userData)
        } else {
          removeUserCookie()
          setUser(null)
        }
      })

    const userFromCookie = getUserFromCookie()
    setUser(userFromCookie)

    return () => {
      cancelAuthListener()
    }
  }, [])

  return useMemo(() => {
    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {props.children}
      </AuthContext.Provider>
    )
  }, [props, user?.email])
}

export { AuthContext, AuthProvider }
