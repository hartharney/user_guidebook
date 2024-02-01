import "firebase/firestore";
import { getFirestore } from "firebase/firestore/lite";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAf5jBZ1xwjNO-0z8Svlr0hw6ehYWytMis",
  authDomain: "new-guide-book.firebaseapp.com",
  projectId: "new-guide-book",
  storageBucket: "new-guide-book.appspot.com",
  messagingSenderId: "545733973253",
  appId: "1:545733973253:web:a4133d5f2abfa6c832536c",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db, firebaseApp };
