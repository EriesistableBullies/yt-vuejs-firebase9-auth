import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyCsbSvL_VSzoHSkuJmkxjE6-v1N1W2zXuE",
  authDomain: "eriesistable-bullies.firebaseapp.com",
  projectId: "eriesistable-bullies",
  storageBucket: "eriesistable-bullies.appspot.com",
  messagingSenderId: "824106009722",
  appId: "1:824106009722:web:98a7316d49eeea63e4a7c3",
  measurementId: "G-TY4LHLLC5G"
};

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export { auth, provider }