import React, { useEffect, useState } from 'react';
import {
  Grid,
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

const today = 'mm-dd-yyyy';
const initialFormValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  dateOfBirth: today,
  status: '',
  additionalFields: {},
  addresses: [{ address: '', state: '', postalCode: '', city: "" }],
}

const MyForm = () => {
  const [formValues, setFormValues] = useState({ ...initialFormValues });
  const [addressListKey, setAddressListKey] = useState(0); // Unique key for AddressList
  const [additionalFields, setAdditionalFields] = useState([]); // Additional fields and values

  const resetForm = () => {
    setFormValues({ ...initialFormValues });
    setAddressListKey((prevKey) => prevKey + 1); // Trigger re-render of AddressList
  };

  const handleSubmit = async () => {
    let isEmptyValue = false;
  
    Object.entries(formValues)
      .filter(([key]) => key !== 'additionalFields') // Exclude additionalFields
      .forEach(([key, value]) => {
        if (!value || value.length === 0) {
          // Set the flag to true if any value is empty
          isEmptyValue = true;
        }
      });
  
    if (isEmptyValue) {
      // Display an alert error
      alert('Please fill in all required fields');
      return;
    }
  
    // Proceed with form submission
    await addPatients(formValues);
    resetForm();
    alert('Form submitted successfully');
  };
  
  
  
  

  const handleChange = (field, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [field]: value,
    }));
  };
  const handleAddNewField = () => {
    const newFieldName = prompt("Enter the name of the new field:");
    console.log(newFieldName)
    if (newFieldName) {
      handleAdditionalFieldChange(newFieldName, "")
    }
  };

  const handleAdditionalFieldChange = (fieldName, fieldValue) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      additionalFields: {
        ...prevFormValues.additionalFields,
        [fieldName]: fieldValue,
      },
    }));
  };


  const renderAdditionalFields = () => {
    console.log(formValues.additionalFields)
    return Object.entries(formValues.additionalFields).map(([fieldName, fieldValue]) => (
      <FormField
        key={fieldName}
        label={fieldName}
        value={fieldValue}
        onChange={(value) => handleAdditionalFieldChange(fieldName, value)}
      />
    ));
  };

  return (
    <Box
      sx={{
        width: 1000,
        margin: 'auto',
        marginTop: "5%",
        padding: 2,
        border: '1px solid #ccc',
        borderRadius: 4,
        boxShadow: 2,
        textAlign: "center"
      }}
    >
      <h1>Add Patient</h1>
      <form>
      <Button variant="contained" color="primary" onClick={handleAddNewField}>
          Add New Fields
        </Button>  
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormField
              label="First Name"
              value={formValues.firstName}
              onChange={(value) => handleChange('firstName', value)}
            />
          </Grid>
          <Grid item xs={4}>
            <FormField
              label="Middle Name"
              value={formValues.middleName}
              onChange={(value) => handleChange('middleName', value)}
            />
          </Grid>
          <Grid item xs={4}>
            <FormField
              label="Last Name"
              value={formValues.lastName}
              onChange={(value) => handleChange('lastName', value)}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormField
              label="Status"
              value={formValues.status}
              onChange={(value) => handleChange('status', value)}
              type="select"
              options={["Inquiry", "Onboarding", "Active", "Churned"]}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label="Date of Birth"
              type="date"
              value={formValues.dateOfBirth}
              onChange={(value) => handleChange('dateOfBirth', value)}
            />
          </Grid>
        </Grid>
        {renderAdditionalFields()}
        <AddressList key={addressListKey} addresses={formValues.addresses} onChange={(value) => handleChange('addresses', value)} />     
      </form>
      <p></p>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
    </Box>
  );
};

export default MyForm;
