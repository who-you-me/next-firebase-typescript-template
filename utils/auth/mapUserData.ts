import firebase from 'firebase'
import { User } from '../../interfaces'

export const mapUserData = async (user: firebase.User): Promise<User> => {
  const { uid, email } = user
  const token = await user.getIdToken(true)
  return {
    id: uid,
    email,
    token,
  }
}
