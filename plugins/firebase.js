import * as firebase from 'firebase/app'
import 'firebase/database'
import config from '@/firebase-setup/config'

const isNotTestEnv = process.env.NODE_ENV !== 'test'

const firebaseApp = isNotTestEnv && (!firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app())

const db = isNotTestEnv && firebaseApp.database()

export {
  db,
  firebase
}
