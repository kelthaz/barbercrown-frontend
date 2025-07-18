import React, { useState } from 'react';
import AppointmentTable from '../components/AppointmentTable';
import AppointmentForm from '../components/AppointmentForm';
import { Appointment } from '../types/appointment';
import { Box, Typography, Paper, Grid } from '@mui/material';


export default function AppointmentsDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleAddAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  return (
    <Box sx={{ p: { xs: 0, sm: 3 }, width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        📅 Crear una cita
      </Typography>

      <Grid container direction="column" alignItems="center" spacing={3}>

        <Paper sx={{ p: 3, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'white', boxShadow: 1 }}>
          <AppointmentForm onAdd={handleAddAppointment} />
        </Paper>

        <div style={{ width: '100%' }}>
          {appointments.length === 0 ? (
            <Typography variant="subtitle1" color="text.secondary" align="center">
              No hay citas aún.
            </Typography>
          ) : (
            <div style={{ width: '100%' }}>
              <AppointmentTable appointments={appointments} />
            </div>
          )}
        </div>
      </Grid>
    </Box>
  );
}