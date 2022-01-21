import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import firebaseConfig from '../configs/firebaseConfig'

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Services
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }