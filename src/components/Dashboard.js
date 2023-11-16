import React from "react";
import DataGridDemo from "./DataGrid";
import Analytics from "./Analytics";
import Box from '@mui/material/Box';
import { usePatientsContext } from "../utilities/PatientContext";
import WelcomeScreen from "./WelcomeScreen";


export default function Dashboard() {
    const { user, signIn } = usePatientsContext();


    return (
        <Box sx={{
            height: '100%',
            width: '100%',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
        }}>
            {user ? (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginLeft: "-15%",
                    padding: '30px',
                    marginTop: "-10%",
                    width: '30%', // Adjust the width for Analytics
                    marginRight: '20px', // Add space between Analytics and DataGridDemo
                }}>
                    <Analytics />
                </Box>
            ) : (
                <WelcomeScreen/>
            )}
            {user && (
                <Box sx={{
                    marginLeft: '-10%' // Move DataGridDemo further to the left
                }}>
                    <DataGridDemo />
                </Box>
            )}
        </Box>
    );
}
