import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
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
  {
    field: 'detailsLink',
    headerName: 'Details',
    width: 100,
    renderCell: (params) => (
      <Link to={`/patient-details/${params.row.id}`}>
        View Details
      </Link>
    ),
  },
];

export default function DataGridDemo() {
  const [patients, setPatients] = useState([]);
  const [initialPatients, setInitialPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  

  useEffect(() => {
    const filteredPatients = initialPatients.filter((patient) => {
      // Iterate through each property value of the patient object
      return Object.values(patient).some((value) => {
        // Check if the value includes the querySearch (case-insensitive)
        return String(value).toLowerCase().includes(searchQuery.toLowerCase());
      });
    });
  
    setPatients(filteredPatients);
  }, [searchQuery]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsData = await getPatients();
        setPatients(patientsData);
        setInitialPatients(patientsData)
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
  }, [patients]);

  // Filter patients based on search query
  const filteredPatients = patients.filter((patient) => {
    if (patient === null) {return} else {
        const searchLower = searchQuery.toLowerCase();
        return ("hi"
        //   patient.fullName.toLowerCase().includes(searchLower) ||
        //   patient.dateOfBirth.toLowerCase().includes(searchLower) ||
        //   patient.status.toLowerCase().includes(searchLower) ||
        //   patient.city.toLowerCase().includes(searchLower) ||
        //   patient.state.toLowerCase().includes(searchLower) ||
        //   patient.postalCode.toLowerCase().includes(searchLower)
        );
    }
  });

  return (
    <div>
      <Box sx={{
        height: 400,
        width: '100%',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h1>Patient Data</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className='grid'>
            <DataGrid
              rows={patients || []}
              columns={columns}
              checkboxSelection
              disableRowSelectionOnClick
              getRowId={(row) => row.id}
            />
          </div>
        )}
      </Box>
    </div>
  );
}
