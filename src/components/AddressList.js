// AddressList.js
import React from 'react';
import Address from './Address';
import Button from '@mui/material/Button';

const AddressList = ({ addresses, onChange }) => {
  const handleAddressChange = (index, key, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index][key] = value;
    onChange(updatedAddresses);
  };

  const addAddress = () => {
    onChange([...addresses, { address: '', state: '', postalCode: '', city: ""}]);
  };

  const removeAddress = (index) => {
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    onChange(updatedAddresses);
  };

  return (
    <div>
      {addresses.map((address, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
          <Address address={address} onChange={(key, value) => handleAddressChange(index, key, value)} />
          {index > 0 && (
            <>
              <Button
                variant="contained"
                color="error"
                onClick={() => removeAddress(index)}
                style={{ marginLeft: '8px' }}  
              >
                Remove
              </Button>
            </>
          )}
        </div>
      ))}
      <Button
        variant="contained"
        sx={{backgroundColor: '#A77B7B',
              '&:hover': {
                backgroundColor: '#FFFFFF',
                color: '#A77B7B', // Dusty rose
              },}} 
        onClick={addAddress}
      >
        Add Address
      </Button>
    </div>
  );
};

export default AddressList;
