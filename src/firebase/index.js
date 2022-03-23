import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyCsbSvL_VSzoHSkuJmkxjE6-v1N1W2zXuE",
  authDomain: "eriesistable-bullies.firebaseapp.com",
  projectId: "eriesistable-bullies",
  storageBucket: "eriesistable-bullies.appspot.com",
  messagingSenderId: "824106009722",
  appId: "1:824106009722:web:98a7316d49eeea63e4a7c3",
  measurementId: "G-TY4LHLLC5G"
};

// init firebase
const app = firebase.initializeApp(firebaseConfig)
// init auth
const auth = firebase.auth()
// init firestore service
const database = firebase.firestore()
// init firebase storage
const storage = firebase.storage()
//timestamp 
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { auth, database, app, storage, timestamp }