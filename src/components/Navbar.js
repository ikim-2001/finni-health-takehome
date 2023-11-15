import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


export default function Navbarr() {

  function handleClick() {
    window.location.href = '/add'
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="home"
            sx={{ mr: 2 }}
          >
            <a href='/'><MenuIcon /></a>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 , cursor: 'pointer'}} onClick={handleClick}>
           Add Patient
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}