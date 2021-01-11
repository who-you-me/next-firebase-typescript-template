import firebase from 'firebase/app'
import 'firebase/auth'
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { mapUserData } from '../utils/auth/mapUserData';
import { setUserCookie } from '../utils/auth/userCookies';

export default function Login() {
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

  return (
    <Layout>
      <button onClick={login}>Login</button>
    </Layout>
  )
}
