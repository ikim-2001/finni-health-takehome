import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { getPatients } from '../utilities/firebase';
import { usePatientsContext } from '../utilities/PatientContext';

export default function DataGridDemo() {
  const { patients, handleUpdate } = usePatientsContext();
  const [initialPatients, setInitialPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      width: 200,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'dateOfBirth',
      headerName: 'Birthdate',
      width: 150,
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable: true,
    },
    {
      field: 'city',
      headerName: 'City',
      width: 150,
      editable: true,
    },
    {
      field: 'state',
      headerName: 'State',
      width: 150,
      editable: true,
    },
    {
      field: 'postalCode',
      headerName: 'Postal Code',
      width: 150,
      editable: true,
    },
  ];

  useEffect(() => {
    const filteredPatients = initialPatients.filter((patient) => {
      return Object.values(patient).some((value) => {
        return String(value).toLowerCase().includes(searchQuery.toLowerCase());
      });
    });

    handleUpdate(filteredPatients);
  }, [searchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsData = await getPatients();
        handleUpdate(patientsData);
        setInitialPatients(patientsData);
      } catch (error) {
        console.error('Error fetching patients: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (params, event) => {
    // Handle the row click, navigate to the details link
    const detailsLink = `/patient-details/${params.row.id}`;
    // You can use the navigation method from react-router-dom
    // or any other method you prefer to navigate to the details page
    window.location.href = detailsLink;
  };

  return (
    <div> 
      <Box sx={{
        height: 400,
        width: '100%',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
      }}>
        <h1>Patient Data</h1>
        <input
  type="text"
  placeholder="Search..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  style={{
    width: '50%', // Set the width to 100% of the parent container
    padding: '10px', // Add padding for better aesthetics
    boxSizing: 'border-box', // Include padding and border in the element's total width and height
    fontSize: '16px', // Set the font size
    marginBottom: '16px', // Add some bottom margin for spacing
    border: '2px solid #333', // Set a bolder border
    borderRadius: '8px', // Set a bigger border radius
  }}
/>
        <br/>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className='grid'>
            <DataGrid
              rows={patients || []}
              columns={columns}
              getRowId={(row) => row.id}
              onRowClick={handleRowClick} // Add onRowClick prop
            />
          </div>
        )}
      </Box>
    </div>
  );
}
