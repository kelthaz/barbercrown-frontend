import React, { useState, useEffect } from 'react';
import AppointmentTable from '../components/AppointmentTable';
import AppointmentForm from '../components/AppointmentForm';
import { Appointment } from '../types/appointment';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { fetchAppointments, fetchBarbers, cancelAppointment } from '../services/appointmentService';
import { Users } from '../../users/types/users'
import { Snackbar, Alert } from '@mui/material';
import { ConfirmDialog } from '../../../shared/components/dialogs/ConfirmDialog';


export default function AppointmentsDashboard() {
  const [appointment, setAppointment] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [barber, setBarber] = useState<Users[]>([]);
  const [appointmentToEdit, setAppointmentToEdit] = useState<Appointment | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState<Appointment | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  const handleAddAppoitment = (newAppointment: Appointment) => {
    setAppointment((prevUsers) => [...prevUsers, newAppointment]);
  };

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

  const handleCancelClick = (appointment: Appointment) => {
    setAppointmentToCancel(appointment);
    setConfirmDialogOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!appointmentToCancel) return;
    try {
      await cancelAppointment(appointmentToCancel.id);
      setSnackbarMessage('Cita cancelada exitosamente');
      loadAppointments();
    } catch (error) {
      setSnackbarMessage('Error al cancelar la cita');
    } finally {
      setConfirmDialogOpen(false);
      setAppointmentToCancel(null);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);


  return (
    <Box sx={{ p: { xs: 0, sm: 3 }, width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        📅 Crear una cita
      </Typography>

      <Grid container direction="column" alignItems="center" spacing={3}>

        <Paper sx={{ p: 3, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'white', boxShadow: 1 }}>
          <AppointmentForm onAdd={handleAddAppoitment} barbers={barber} appointmentToEdit={appointmentToEdit}
            onUpdate={loadAppointments} onClearEdit={() => setAppointmentToEdit(null)} />
        </Paper>

        <div style={{ width: '100%' }}>
          {appointment.length === 0 ? (
            <Typography variant="subtitle1" color="text.secondary" align="center">
              No hay citas aún.
            </Typography>
          ) : (
            <div style={{ width: '100%' }}>
              <AppointmentTable appointments={appointment} onEdit={(appt) => setAppointmentToEdit(appt)} onCancel={handleCancelClick} />

              <ConfirmDialog
                open={confirmDialogOpen}
                title="¿Cancelar cita?"
                content="¿Estás seguro que deseas cancelar esta cita?"
                onConfirm={handleConfirmCancel}
                onCancel={() => setConfirmDialogOpen(false)}
              />

              <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
                <Alert
                  onClose={handleCloseSnackbar}
                  severity="success" 
                  sx={{ width: '100%' }}
                >
                  {snackbarMessage}
                </Alert>
              </Snackbar>
            </div>
          )}
        </div>
      </Grid>
    </Box>
  );
}