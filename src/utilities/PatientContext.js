import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPatients } from '../utilities/firebase'; // Import your function to fetch patients

const PatientsContext = createContext();

export const usePatientsContext = () => useContext(PatientsContext);

export const PatientsProvider = ({ children }) => {
  const [patients, setContextPatients] = useState([]);

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
    <PatientsContext.Provider value={{ patients, handleUpdate}}>
      {children}
    </PatientsContext.Provider>
  );
};
