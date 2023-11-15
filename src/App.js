import React from "react";
import MyForm from "./components/AddPatient";
import './App.css'; 
import DataGridDemo from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import PatientDetails from "./components/PatientDetails";
import { PatientsProvider } from "./utilities/PatientContext";


const App = () => {
  return (
    <PatientsProvider>
      <div>
            <Navbar/>
          <BrowserRouter>
          <Routes>
              <Route path='/' element={<DataGridDemo />}/>
              <Route path='/add' element={<MyForm />}/>
              <Route path='/patient-details/:id' element={<PatientDetails />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </PatientsProvider>
  );
};

export default App;
