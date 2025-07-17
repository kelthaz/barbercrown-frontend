import React, { useState } from 'react';
import { Appointment } from '../types/appointment';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, Paper, Grid } from '@mui/material';
import Alert from '../../../shared/components/alerts/Alert';

interface Props {
  onAdd: (appointment: Appointment) => void;
}

export default function AppointmentForm({ onAdd }: Props) {
  const [clientName, setClientName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [barber, setBarber] = useState('Juan');
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientName === '' || date === '' || time === '') {
      setSuccessAlert(false);
      setErrorAlert(true);
    } else {
      const newAppointment: Appointment = {
        id: uuidv4(),
        clientName,
        date,
        time,
        status: 'pending',
      };
      onAdd(newAppointment);
      setSuccessAlert(true)
      setErrorAlert(false);
    }
  };

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
        <TextField
          label="Fecha"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Hora"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />

        <FormControl fullWidth variant="outlined">
          <InputLabel id="barber-label">Barbero</InputLabel>
          <Select
            labelId="barber-label"
            id="barber"
            value={barber}
            onChange={(e) => setBarber(e.target.value)}
            label="Barbero"
          >
            <MenuItem value="Juan">Juan</MenuItem>
            <MenuItem value="María">María</MenuItem>
            <MenuItem value="Carlos">Carlos</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" >
          Agendar
        </Button>
        {successAlert && <Alert message='Cita agendada con éxito' error='' />}
        {errorAlert && <Alert message='' error='Faltan campos por completar.' />}
      </Box>
    </Paper>
  );
}