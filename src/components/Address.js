import React from 'react';
import {
    Box,
    Button,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Autocomplete,
    Grid,
  } from '@mui/material';

  const FormField = ({ label, value, onChange, type = 'text', options = [], ...rest }) => (
    <FormControl fullWidth margin="normal">
      {type === 'select' ? (
        <>
          {/* ... (unchanged) */}
        </>
      ) : type === 'autocomplete' ? (
        <Autocomplete
          disablePortal
          options={options}
          value={value}  // Make sure value is correctly passed to Autocomplete
          onChange={(event, newValue) => onChange(newValue)}  // Adjust the onChange handler
          renderInput={(params) => <TextField {...params} label={label} />}
          {...rest}
        />
      ) : (
        <TextField
          label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={type}
          {...rest}
        />
      )}       
    </FormControl>
  );

const states = [
    "Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
    "Guam", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota",
    "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York",
    "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands",
    "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"
  ];
// Address.js
const Address = ({ address, onChange }) => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormField
              label="Address"
              value={address.address}
              onChange={(value) => onChange('address', value)}
            />
          </Grid>
          <Grid item xs={4}>
            <FormField
              label="City"
              value={address.city}
              onChange={(value) => onChange('city', value)}
            />
          </Grid>
          <Grid item xs={2}>
            <FormField
              label="State"
              type="autocomplete"
              options={states}
              value={address.state}
              onChange={(value) => onChange('state', value)}
            />
          </Grid>
          <Grid item xs={2}>
            <FormField
              label="Postal Code"
              value={address.postalCode}
              onChange={(value) => onChange('postalCode', value)}
            />
          </Grid>
        </Grid>
      </>
    );
  };
  
  export default Address;
  