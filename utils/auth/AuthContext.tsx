import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import 'firebase/auth'
import { User } from '../../interfaces'
import initFirebase from '../auth/initFirebase'
import {
  removeUserCookie,
  setUserCookie,
  getUserFromCookie,
} from './userCookies'
import { mapUserData } from './mapUserData'

initFirebase()

interface IAuthContext {
  user: User | null | undefined,
  logout: () => void
}

const AuthContext = createContext<IAuthContext>({ user: undefined, logout: () => Promise.resolve() })

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const AuthProvider = (props: any): JSX.Element => {
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const router = useRouter()

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
          setUser(undefined)
        }
      })

    const userFromCookie = getUserFromCookie()
    if (!userFromCookie) {
      router.push('/')
      return
    }
    setUser(userFromCookie)

    return () => {
      cancelAuthListener()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
