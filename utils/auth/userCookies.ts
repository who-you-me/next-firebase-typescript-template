import cookies from 'js-cookie'
import { User } from '../../interfaces'

export const getUserFromCookie = (): User | undefined => {
  const cookie = cookies.get('auth')
  if (!cookie) {
    return
  }
  return JSON.parse(cookie)
}

export const setUserCookie = (user: User): void => {
  cookies.set('auth', user, {
    expires: 1 / 24,
  })
}

export const removeUserCookie = (): void => cookies.remove('auth')
