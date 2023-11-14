// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { setDoc, doc } from "@firebase/firestore";
import { getFirestore, collection, addDoc } from 'firebase/firestore';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMr3zuiso8B385svI7kBhVdxqQBYDMdfg",
  authDomain: "finni-health.firebaseapp.com",
  projectId: "finni-health",
  storageBucket: "finni-health.appspot.com",
  messagingSenderId: "440388972589",
  appId: "1:440388972589:web:6e6de82f60b55b952688a4",
  measurementId: "G-R14QE1KERD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export default async function addPatients(formData) {
    console.log("hit")
    try {
        const myCollection = collection(db, 'patients');
        // Add the document to the collection
        const newDocRef = await addDoc(myCollection, formData);
        console.log('New document added with ID:', newDocRef.id);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
};
