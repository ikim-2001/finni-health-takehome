import React from 'react';
import { useParams } from 'react-router-dom';
import { usePatientsContext } from '../utilities/PatientContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const PatientDetails = () => {
  let { id } = useParams();
  const { initialPatients } = usePatientsContext();
  const patient = initialPatients ? initialPatients[id] : null;

  if (!patient) {
    return null;
  }

  const cardStyle = {
    width: '400px',
    padding: '20px',
    border: '5px solid #A77B7B',
    borderRadius: '8px',
    backgroundColor: '#F4E3D7', // Dusty rose
    color: '#8F5E5E', // Darker brown
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card sx={cardStyle}>
        <CardContent sx={contentStyle}>
          <h2>{`${patient.firstName} ${patient.middleName || ''} ${patient.lastName}`}</h2>
          <h3>Date of Birth: {patient.dateOfBirth}</h3>
          <h3>Status: {patient.status}</h3>
          {patient.addresses.map((address, index) => (
            <h3 key={index}>
              Address {index + 1}: {`${address.address} ${address.city}, ${address.state} ${address.postalCode}`}
            </h3>
          ))}
          {Object.entries(patient.additionalFields).map(([key, value], index) => (
            <div key={index}>
              <h3>{`${key}: ${value}`}</h3>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDetails;
