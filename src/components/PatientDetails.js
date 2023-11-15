import React from 'react';
import { useParams } from 'react-router-dom';
import { usePatientsContext } from '../utilities/PatientContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const PatientDetails = () => {
    let { id } = useParams();
    const { patients } = usePatientsContext();
    const patient = patients[id]
    console.log(patient)

 // Check if patient.firstName is undefined
 if (!patient) {
    // You can return null or a message indicating that the information is not available
    return null;
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: '400px', padding: '20px', border: '2px solid #ccc', borderRadius: '8px' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {`${patient.firstName} ${patient.middleName || ''} ${patient.lastName}`}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Date of Birth: {patient.dateOfBirth}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Status: {patient.status}
          </Typography>
          {patient.addresses.map((address, index) => (
            <Typography key={index} variant="subtitle1" gutterBottom>
              Address {index + 1}: {`${address.address} ${address.city}, ${address.state} ${address.postalCode}`}
            </Typography>
          ))}
          {Object.entries(patient.additionalFields).map(([key, value], index) => (
            <div key={index}>
              <Typography variant="subtitle1" gutterBottom>
                {`${key}: ${value}`}
              </Typography>
            </div>
          ))}
          {/* Add more fields as needed */}
        </CardContent>
      </Card>
    </div>
  );
};
export default PatientDetails;
