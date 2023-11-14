import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { getPatients } from '../utilities/firebase';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
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

export default function DataGridDemo() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsData = await getPatients();
        setPatients(patientsData);
      } catch (error) {
        console.error('Error fetching patients: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Patients have changed:', patients);
    // Add any additional logic or actions you want to perform when patients change
  }, [patients]);

  return (
    <Box sx={{
      height: 400,
      width: '100%',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Center horizontally
    }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className='grid'>
          <DataGrid
            rows={patients || []}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
      )}
    </Box>
  );
}
