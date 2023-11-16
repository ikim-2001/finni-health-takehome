import React, { useState } from "react";
import Box from '@mui/material/Box';
import { usePatientsContext } from "../utilities/PatientContext";
import Button from '@mui/material/Button';

export default function Analytics() {
  const { patients, handleUpdate, initialPatients } = usePatientsContext();
  const [filteredStatus, setFilteredStatus] = useState(null);

  const totalPatients = initialPatients ? initialPatients.length : 0;

  const statusCounts = {
    Inquiry: initialPatients ? initialPatients.filter(patient => patient.status === 'Inquiry').length : 0,
    Active: initialPatients ? initialPatients.filter(patient => patient.status === 'Active').length : 0,
    Onboarding: initialPatients ? initialPatients.filter(patient => patient.status === 'Onboarding').length : 0,
    Churned: initialPatients ? initialPatients.filter(patient => patient.status === 'Churned').length : 0,
  };

  const handleStatusClick = (status) => {
    setFilteredStatus(status);
    if (status === "All") {
        handleUpdate(initialPatients);
    } else {
      const filteredPatients = initialPatients.filter(patient => patient.status === status);
      handleUpdate(filteredPatients);
    }
  };

  const StatusButton = ({ status, count, onClick }) => {
    return (
      <Button
        variant="contained"
        sx={{
            padding: '30px',
            marginBottom: '10px',
            width: '100%',
            backgroundColor: '#A77B7B',
            border: '2px solid #A77B7B',
            borderRadius: '20px',
            '&:hover': {
              backgroundColor: '#966A6A', // Change the color on hover
              textAlign: "center",
            },
        }}
        onClick={onClick}
      >
        <h3 style={{ marginBottom: '5px', margin: '0' }}>{status}: {count}</h3>
      </Button>
    );
  };

  return patients ? (
    <div style={{ position: 'absolute', width: '15%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          width: '100%',
          marginTop: '-40%'
        }}
      >
        <StatusButton status="All " count={totalPatients} onClick={() => handleStatusClick("All")} />
        <StatusButton status="Inquiry " count={statusCounts.Inquiry} onClick={() => handleStatusClick("Inquiry")}/>
        <StatusButton status="Active " count={statusCounts.Active} onClick={() => handleStatusClick("Active")} />
        <StatusButton status="Onboarding " count={statusCounts.Onboarding} onClick={() => handleStatusClick("Onboarding")}/>
        <StatusButton status="Churned " count={statusCounts.Churned} onClick={() => handleStatusClick("Churned")} />
      </Box>
    </div>
  ) : null;
}
