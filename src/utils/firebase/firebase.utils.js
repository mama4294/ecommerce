import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDeSZqkrCNwyS7eofO61E7Hs3MAd6LLHWw",
  authDomain: "mith-clothing.firebaseapp.com",
  projectId: "mith-clothing",
  storageBucket: "mith-clothing.appspot.com",
  messagingSenderId: "546581222174",
  appId: "1:546581222174:web:18db09db97debe09f06f0f",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

//Authentication
export const auth = getAuth();
//Signin
export const signinwithgooglePopup = () => signInWithPopup(auth, provider);
//Database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    //New user. Add data from auth to firestore
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        photoURL,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userDocRef;
};
