import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, Paper } from '@mui/material';
import Alert from '../../../shared/components/alerts/Alert';
import { getTime, createAppointment } from '../services/appointmentService';
import { Appointment } from '../types/appointment';
interface Barber {
  id: string;
  name: string;
}
interface Props {
  barbers: Barber[];
}


interface Props {
  onAdd: (user: Appointment) => void;
}

export default function AppointmentForm({ barbers, onAdd }: Props) {
  const [clientName, setClientName] = useState('');
  const [date, setDate] = useState('');
  const [selectedBarber, setSelectedBarber] = useState<string>('');
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [availableHours, setAvailableHours] = useState<string[]>([]);
  const [selectedHour, setSelectedHour] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userString = localStorage.getItem('user');
      let userIdData = null
      if (userString) {
        const user = JSON.parse(userString);
        userIdData = user.id;
      }
      const barber = barbers.find((b) => b.id === selectedBarber);
      const barberName = barber ? barber.name : '';

      const newAppointment = await createAppointment({
        client: clientName, userId: userIdData, date, time: selectedHour, service: 'peluqueria', barberName, status: 'pending'
      });
      onAdd(newAppointment)
      setSuccessAlert(false);
      setErrorAlert(true);
      setClientName('')
      setSelectedBarber('')
      setDate('')
      setAvailableHours([])

    } catch (error) {
      console.error("Error creating user:", error);
      setErrorAlert(true);
      setSuccessAlert(false);
    }
  };

  useEffect(() => {
    const fetchHours = async () => {
      if (!selectedBarber || !date) return;
      const barber = barbers.find((b) => b.id === selectedBarber);
      const data = await getTime({ barberName: barber?.name, date });
      setAvailableHours(data);
    };

    fetchHours();
  }, [selectedBarber, date]);


  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        ➕ Nueva Cita
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Cliente"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          fullWidth
          variant="outlined"
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel id="barber-label">Barbero</InputLabel>
          <Select
            labelId="barber-label"
            id="barber"
            value={selectedBarber}
            onChange={(e) => setSelectedBarber(e.target.value)}
            label="Barbero"
          >
            {barbers.map((barber) => (
              <MenuItem key={barber.id} value={barber.id}>
                {barber.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Fecha"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          variant="outlined"
        />
        <FormControl fullWidth>
          <InputLabel id="hour-label">Hora disponible</InputLabel>
          <Select
            labelId="hour-label"
            id="hour"
            value={selectedHour}
            onChange={(e) => setSelectedHour(e.target.value)}
            label="Hora disponible"
          >
            {availableHours.map((hour, index) => (
              <MenuItem key={index} value={hour}>
                {hour}
              </MenuItem>
            ))}
          </Select>
        </FormControl>


        <Button type="submit" variant="contained" color="primary" >
          Agendar
        </Button>
        {successAlert && <Alert message='Cita agendada con éxito' error='' />}
      </Box>
    </Paper>
  );
}