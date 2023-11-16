import React from "react";
import MyForm from "./components/AddPatient";
import './App.css'; 
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientDetails from "./components/PatientDetails";
import { PatientsProvider } from "./utilities/PatientContext";
import Dashboard from "./components/Dashboard";


const App = () => {
  return (
    <BrowserRouter>
    <PatientsProvider>
      <div>
          <Navbar/>
          <Routes>
              <Route path='/' element={<Dashboard/>}/>
              <Route path='/add' element={<MyForm />}/>
              <Route path='/patient-details/:id' element={<PatientDetails />}/>
          </Routes>
      </div>
    </PatientsProvider>
    </BrowserRouter>
  );
};

export default App;
