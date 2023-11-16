import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { usePatientsContext } from '../utilities/PatientContext';

export default function Navbar() {
  const { signIn, signOut, user } = usePatientsContext();

  const fallColors = {
    primary: '#A77B7B', // Softer tone of orange
    secondary: '#A77B7B', // Softer tone of brown
    loginButton: '#F4E3D7', // Light pastel yellow
    loginButtonHover: '#FFE69D', // Slightly darker yellow on hover
  };

  const handleClick = () => {
    const detailsLink = `/`;
    window.location.href = detailsLink;
  };


  const getButtonColor = () => (user ? fallColors.secondary : fallColors.primary);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: fallColors.primary }}>
        <Toolbar>
          <Typography onClick={handleClick} variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
            Finni Health
          </Typography>
          <Button
            color="inherit"
            onClick={user ? signOut : signIn}
            sx={{
              color: getButtonColor(),
              backgroundColor: fallColors.loginButton,
              '&:hover': {
                backgroundColor: fallColors.loginButtonHover,
              },
            }}
          >
            {user ? 'Sign out' : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
