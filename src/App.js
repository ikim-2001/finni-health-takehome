import React from "react";
import MyForm from "./components/AddPatient";
import './App.css'; 
import Dashboard from "./components/Dashboard";
import DataGridDemo from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";


const App = () => {
  return (
    <div>
                <Navbar/>
        {/* <MyForm></MyForm> */}
        <BrowserRouter>
      {/* <UserProvider> */}
        <Routes>
          {/* This is the parent route - render its child routes */}
            <Route path='/' element={<DataGridDemo />}/>
            <Route path='/add' element={<MyForm />}/>
        </Routes>
        {/* </UserProvider> */}
      </BrowserRouter>
          {/* <DataGridDemo/> */}
    </div>
  );
};

export default App;
