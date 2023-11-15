import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPatients } from '../utilities/firebase'; // Import your function to fetch patients
import { signInWithRedirect } from "firebase/auth";
import { signInPopup } from '../utilities/firebase';


const PatientsContext = createContext();


export const usePatientsContext = () => useContext(PatientsContext);


export const PatientsProvider = ({ children }) => {
  const [patients, setContextPatients] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // You can add more state and functions related to authentication here

  const signIn = () => {
    if (signInPopup()) {
        
    }

    setIsSignedIn(true);
  };

  const signOut = () => {
    // Add your sign-out logic here
    // For example, setting the state to false for demonstration purposes
    setIsSignedIn(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsData = await getPatients();
        setContextPatients(patientsData);
      } catch (error) {
        console.error('Error fetching patients: ', error);
      } 
    };

    fetchData();
  }, []);

  function handleUpdate(newPatients) {
    setContextPatients(newPatients);
  }

  return (
    <PatientsContext.Provider value={{ patients, handleUpdate, signIn, signOut, isSignedIn}}>
      {children}
    </PatientsContext.Provider>
  );
};
