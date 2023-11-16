import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { getPatients } from '../utilities/firebase';
import { usePatientsContext } from '../utilities/PatientContext';
import Button from '@mui/material/Button';


export default function DataGridDemo() {
  const { patients, handleUpdate, user } = usePatientsContext();
  const [initialPatients, setInitialPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  function handleClick() {
    window.location.href = '/add'
  }

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
    console.log("hi")
    handleUpdate(filteredPatients);
  }, [searchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsData = await getPatients(user);
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
    console.log('hi')
    const detailsLink = `/patient-details/${params.row.id}`;
    // You can use the navigation method from react-router-dom
    // or any other method you prefer to navigate to the details page
    window.location.href = detailsLink;
  };
  return (
    <div style={{ width: '80%', margin: 'auto' }}> 
      <Box sx={{
        height: 400,
        width: '100%',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        textAlign: "center",
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          width: "60%",
        }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '70%',
              padding: '10px',
              boxSizing: 'border-box',
              fontSize: '16px',
              border: '1px solid #333',
              margin: "auto",
              backgroundColor: "#DDDDDD",
              borderRadius: '20px',
            }}
          />
          <Button
            color='primary'
            variant="contained"
            sx={{
              backgroundColor: '#A77B7B',
              '&:hover': {
                backgroundColor: '#966A6A',
              },
              height: '40px',
              cursor: 'pointer',
              borderRadius: '10px',
              minWidth: '100px',
              margin: "auto"
            }}
            onClick={handleClick}
          >
            Add New
          </Button>
        </Box>
        <br />
        {patients && patients.length === 0 ? (
          <h1>No Patients Available. Click 'Add New' to create more!</h1>
        ) : (
          (loading) ? (
            <div>Loading...</div>
          ) : (
            <div className='grid'>
              <DataGrid
                rows={patients}
                columns={columns}
                getRowId={(row) => row.id}
                onRowClick={handleRowClick}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
              />
            </div>
          )
        )}
      </Box>
    </div>
  );
}
