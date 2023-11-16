import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPatients } from '../utilities/firebase'; // Import your function to fetch patients
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { signInPopup } from '../utilities/firebase';
import { auth, provider} from '../utilities/firebase';
import { useNavigate } from 'react-router-dom';


const PatientsContext = createContext();


export const usePatientsContext = () => useContext(PatientsContext);


export const PatientsProvider = ({ children }) => {
  const [patients, setContextPatients] = useState([]);
  const [initialPatients, setInitialContextPatients] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    })
   

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, []);


  // You can add more state and functions related to authentication here
  const signIn = () => {
    signInWithPopup(auth, provider);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsData = await getPatients(user);
        setContextPatients(patientsData);
        setInitialContextPatients(patientsData);
      } catch (error) {
        console.error('Error fetching patients: ', error);
      } 
    };

    fetchData();
  }, [user]);

  const signOut = () => {
    
    auth.signOut();
    navigate("/");
  };

  function handleUpdate(newPatients) {
    setContextPatients(newPatients);
  }

  return (
    <PatientsContext.Provider value={{ initialPatients, patients, handleUpdate, signIn, signOut, user}}>
      {children}
    </PatientsContext.Provider>
  );
};
