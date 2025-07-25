import React, { useState, useEffect } from 'react';
import AppointmentTable from '../components/AppointmentTable';
import AppointmentForm from '../components/AppointmentForm';
import { Appointment } from '../types/appointment';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { fetchAppointments, fetchBarbers } from '../services/appointmentService';
import { Users } from '../../users/types/users'

export default function AppointmentsDashboard() {
  const [appointment, setAppointment] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [barber, setBarber] = useState<Users[]>([]);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const data = await fetchAppointments();
      setAppointment(data);
    } catch (error) {
      console.error("Error loading appointment", error);
    } finally {
      setLoading(false);
    }
  };

  const loadBarbers = async () => {
    try {
      const barberData = await fetchBarbers();
      setBarber(barberData);
    } catch (error) {
      console.error("Error loading appointment", error);
    }
  };

  useEffect(() => {
    loadAppointments();
    loadBarbers()
  }, []);

  return (
    <Box sx={{ p: { xs: 0, sm: 3 }, width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        📅 Crear una cita
      </Typography>

      <Grid container direction="column" alignItems="center" spacing={3}>

        <Paper sx={{ p: 3, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'white', boxShadow: 1 }}>
          <AppointmentForm barbers={barber} />
        </Paper>

        <div style={{ width: '100%' }}>
          {appointment.length === 0 ? (
            <Typography variant="subtitle1" color="text.secondary" align="center">
              No hay citas aún.
            </Typography>
          ) : (
            <div style={{ width: '100%' }}>
              <AppointmentTable appointments={appointment} />
            </div>
          )}
        </div>
      </Grid>
    </Box>
  );
}