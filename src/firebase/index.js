import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/database'
const firebaseConfig = {
  apiKey: "AIzaSyCsbSvL_VSzoHSkuJmkxjE6-v1N1W2zXuE",
  authDomain: "eriesistable-bullies.firebaseapp.com",
  databaseURL: "https://eriesistable-bullies-default-rtdb.firebaseio.com",
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
// init real-time database
const rtdb = firebase.database()
//timestamp 
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { auth, database, app, storage, rtdb, timestamp }