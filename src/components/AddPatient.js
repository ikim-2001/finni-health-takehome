import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Autocomplete,
} from '@mui/material';
import addPatients from '../utilities/firebase';
import AddressList from './AddressList';

const FormField = ({ label, value, onChange, type = 'text', options = [], ...rest }) => (
  <FormControl fullWidth margin="normal">
    {type === 'select' ? (
      <>
        <InputLabel>{label}</InputLabel>
        <Select
          label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...rest}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </>
    ) : type === 'autocomplete' ? (
      <Autocomplete
        disablePortal
        options={options}
        sx={{ width: 300 }}
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


const today = new Date().toISOString().split('T')[0];



const MyForm = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: today,
    status: '',
    additionalFields: {},
    addresses: [],
  });


  
  const handleSubmit = async () => {
    console.log("hi")
    await addPatients(formValues);
  };

  const handleChange = (field, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [field]: value,
    }));
  };

  return (
    <Box
      sx={{
        width: 400,
        margin: 'auto',
        padding: 2,
        border: '1px solid #ccc',
        borderRadius: 4,
        boxShadow: 2,
      }}
    >
      <form>
        <FormField
          label="First Name"
          value={formValues.firstName}
          onChange={(value) => handleChange('firstName', value)}
        />
        <FormField
          label="Middle Name"
          value={formValues.middleName}
          onChange={(value) => handleChange('middleName', value)}
        />
        <FormField
          label="Last Name"
          value={formValues.lastName}
          onChange={(value) => handleChange('lastName', value)}
        />
        <FormField
          label="Status"
          value={formValues.status}
          onChange={(value) => handleChange('status', value)}
          type="select"
          options={["Inquiry", "Onboarding", "Active", "Churned"]}
        />
        <FormField
          label="Date of Birth"
          type="date"
          value={formValues.dateOfBirth}
          className={"hi"}
          onChange={(value) => handleChange('dateOfBirth', value)}
        />
      <AddressList addresses={formValues.addresses} onChange={(value) => handleChange('addresses', value)} />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default MyForm;
