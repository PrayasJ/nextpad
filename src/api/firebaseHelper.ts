// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  getRedirectResult,
} from 'firebase/auth'
import { configs } from '../configs/configs'
import { fileExists, readFileContent, writeFileContent } from './fileUtil'

// Initialize Firebase
const app = initializeApp(configs.FIREBASE_CONFIG)
//const analytics = getAnalytics(app);

//Initialize GoogleAuthProvider
const provider = new GoogleAuthProvider()
const auth = getAuth(app)

export const checkCredentials = async () => {
  let isFileExists = await fileExists(configs.CREDENTIAL_FILE)
  if (isFileExists) {
    let credentials = await readFileContent(configs.CREDENTIAL_FILE)
    console.log({ credentials })
    return JSON.parse(credentials)
  } else {
    let userData = await googlePopupLogin()
    return userData
  }
}

export const googlePopupLogin = async () => {
  let result = await signInWithPopup(auth, provider)
  const credential = GoogleAuthProvider.credentialFromResult(result)
  if (!credential) return
  const token = credential.accessToken
  // The signed-in user info.
  const user = result.user
  let userData = {
    token,
    user,
  }
  await writeFileContent(configs.CREDENTIAL_FILE, JSON.stringify(userData))
  return userData
}

export const googleRedirectLogin = () => {
  getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      if (!result) return
      const credential = GoogleAuthProvider.credentialFromResult(result)
      if (!credential) return
      const token = credential.accessToken

      // The signed-in user info.
      const user = result.user
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
    })
}
