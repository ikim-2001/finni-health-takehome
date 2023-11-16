import React from "react";
import MyForm from "./components/AddPatient";
import './App.css'; 
// import SignIn from './components/SignIn';
import DataGridDemo from "./components/DataGrid";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import PatientDetails from "./components/PatientDetails";
import { PatientsProvider } from "./utilities/PatientContext";
import Analytics from "./components/Analytics";
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
              {/* <Route path="/signin" element={<SignIn/>}/> */}
          </Routes>
      </div>
    </PatientsProvider>
    </BrowserRouter>
  );
};

export default App;
