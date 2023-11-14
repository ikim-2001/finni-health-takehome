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
    onChange([...addresses, { address: '', state: '' }]);
  };

  const removeAddress = (index) => {
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    onChange(updatedAddresses);
  };

  return (
    <div>
      {addresses.map((address, index) => (
        <div key={index}>
          <Address address={address} onChange={(key, value) => handleAddressChange(index, key, value)} />
          {index > 0 && (
            <>
              <Button
                variant="contained"
                color="error"
                onClick={() => removeAddress(index)}
                style={{ marginRight: '8px' }}  
              >
                Remove
              </Button>
            </>
          )}
        </div>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={addAddress}
      >
        Add Address
      </Button>
    </div>
  );
};

export default AddressList;
