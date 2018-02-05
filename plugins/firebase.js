import * as firebase from 'firebase/app'
import 'firebase/database'
import config from '@/firebase-setup/config'

const firebaseApp = !firebase.apps.length && firebase.initializeApp(config)

const db = firebaseApp.database()

export {
  db,
  firebase
}
