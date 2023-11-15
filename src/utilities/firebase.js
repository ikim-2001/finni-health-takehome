// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';




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
const myCollection = collection(db, 'patients');



export default async function addPatients(formData) {
    try {
        // Add the document to the collection
        const newDocRef = await addDoc(myCollection, formData);
        console.log('New document added with ID:', newDocRef.id);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
};

export async function getPatients() {
    let res = []
    try {
      const querySnapshot = await getDocs(myCollection);
      let count = 0
      querySnapshot.forEach((doc) => {
        // doc.data() is the data of each document
        const data = doc.data();
        data["id"] = count
        data["city"] = data.addresses[0].city
        data["state"] = data.addresses[0].state
        data["postalCode"] = data.addresses[0].postalCode
        count += 1
        res.push(data)
      });
      return res;
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  }