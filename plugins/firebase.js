import config from '@/firebase-setup/config'

import firebase from 'firebase/app'
import 'firebase/database'

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app()

export default firebaseApp
export const db = firebaseApp.database()
