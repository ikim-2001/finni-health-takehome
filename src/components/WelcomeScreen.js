import React from 'react';
import { usePatientsContext } from '../utilities/PatientContext';
import Button from '@mui/material/Button';

export default function WelcomeScreen() {
  const { signIn } = usePatientsContext();

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    marginTop: '-5%'
  };

  const wrapperStyle = {
    textAlign: 'center',
    padding: '40px',
    borderRadius: '10px',
    border: '5px solid #A77B7B',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    background: '#F4E3D7', // Light pastel peach
    maxWidth: '600px',
    width: '80%',
  };

  const headingStyle = {
    fontSize: '3rem',
    marginBottom: '20px',
    color: '#A77B7B', // Dusty rose
  };


  return (
    <div style={containerStyle}>
      <div style={wrapperStyle}>
        <h1 style={headingStyle}>Welcome to Finni Health Takehome!</h1>
        <Button
          sx={{
            backgroundColor: '#A77B7B',
            '&:hover': {
              backgroundColor: '#FFFFFF',
              color: '#A77B7B', // Dusty rose
            },
          }}
          variant="contained"
          onClick={signIn}
        >
          Sign In with Google
        </Button>
      </div>
    </div>
  );
}
