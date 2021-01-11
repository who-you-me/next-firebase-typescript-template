import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { getUserFromCookie } from './userCookies'

const withLoginRequired = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const router = useRouter()

    useEffect(() => {
      const user = getUserFromCookie()
      if (!user) {
        router.push('/login')
      }
    }, [])

    return <WrappedComponent {...props} />
  }
}

export default withLoginRequired
