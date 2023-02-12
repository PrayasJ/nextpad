import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { checkCredentials, googlePopupLogin } from '@/api/firebaseHelper'
import { User } from 'firebase/auth'

const inter = Inter({ subsets: ['latin'] })

interface PropInterface {
  credentials: {
    token: string | null
    user: User
  } | null
}

export default function Home(props: PropInterface) {

  const [credentials, setCredentials] = useState(props.credentials)
  // useEffect(() => {
  //   if(typeof window !== 'undefined') {
  //     console.log('qwerty')
  //     invoke('greet', {name: "World"})
  //     .then(window.alert)
  //     .catch(console.error)
  //   }
  // }, [])

  useEffect(() => {
    checkCredentials().then((res) => {
      setCredentials(res)
    })
  }, [])

  return (
    <>
      <Head>
        <title>NextPad</title>
        <meta name="description" content="Made with love by Prayas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
      {JSON.stringify(credentials, null, 4)}
      </div>
    </>
  )
}


export async function getStaticProps() {
  let emptyProps:PropInterface = {
    credentials: null
  }

  return {
    props: emptyProps
  }
}