import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6jZP-xPEQLeW25kaKIC3lfUc6QYPhGUQ",
  authDomain: "ecomm-5c514.firebaseapp.com",
  projectId: "ecomm-5c514",
  storageBucket: "ecomm-5c514.appspot.com",
  messagingSenderId: "1023778785141",
  appId: "1:1023778785141:web:fec78a3809da5828c2f53c",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const addCollectionsAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("done");
};

export const getCollectionsAndDocument = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshots = await getDocs(q);
  
  const categoryArray = querySnapshots.docs.map(docSnapshot => docSnapshot.data());


  return categoryArray;
  // console.log('Snapshots', querySnapshots.docs[0].data())
};

export const createUserDocumentFromAuth = async (userAuth) => {
  try {
    if (!userAuth) return;

    const { uid, displayName, email } = userAuth;
    const docRef = doc(db, "users", uid);

    const userSnapShot = await getDoc(docRef);

    if (!userSnapShot.exists()) {
      const createdAt = new Date();
      await setDoc(docRef, { displayName, email, createdAt });
      console.info("user created");
    } else {
      console.info("user logged in");
      return docRef;
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  try {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error.code === "auth/email-already-in-use")
      alert("Email already in use");
    else console.error(error.message, "createAuthUserWithEmailAndPassword");
  }
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  try {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error.code === "auth/user-not-found")
      throw new Error("Email Not Found");
    if (error.code === "auth/wrong-password") throw new Error("Wrong Password");
  }
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  const authStatus = onAuthStateChanged(auth, callback);
  // console.log(authStatus)
  return authStatus;
};
