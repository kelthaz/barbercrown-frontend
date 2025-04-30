import React, { useState } from 'react';
import AppointmentTable from '../components/AppointmentTable';
import AppointmentForm from '../components/AppointmentForm';
import { Appointment } from '../types/appointment';
import { Box, Typography, Paper, Grid } from '@mui/material';

const dummyAppointments: Appointment[] = [
  { id: '1', clientName: 'Carlos Ramírez', date: '2025-04-30', time: '10:00 AM', status: 'confirmed' },
  { id: '2', clientName: 'Lucía Gómez', date: '2025-04-30', time: '11:30 AM', status: 'pending' },
  { id: '3', clientName: 'Pedro Fuentes', date: '2025-04-30', time: '01:00 PM', status: 'cancelled' }
];

export default function AppointmentsDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleAddAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  return (
    <Box sx={{ p: { xs: 0, sm: 3 }, width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        📅 Tus citas
      </Typography>

      <Grid container direction="column" alignItems="center" spacing={3}>
        <Grid item xs={12} sm="auto" md="auto" lg="auto">
          <Box sx={{ maxWidth: 600, width: '100%' }}>
            <Paper sx={{ p: 3, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'white', boxShadow: 1 }}>
              <AppointmentForm onAdd={handleAddAppointment} />
            </Paper>
          </Box>
        </Grid>

        <Grid item xs={12} sx={{ width: '100%' }}> {/* Eliminamos sm="auto" md="auto" lg="auto" y maxWidth */}
          {appointments.length === 0 ? (
            <Typography variant="subtitle1" color="text.secondary" align="center">
              No hay citas aún.
            </Typography>
          ) : (
            <div style={{ width: '100%' }}> {/* Eliminamos maxWidth y margin */}
              <AppointmentTable appointments={appointments} />
            </div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}