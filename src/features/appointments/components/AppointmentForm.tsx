import React, { useState } from 'react';
import { Appointment } from '../types/appointment';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, Paper, Grid } from '@mui/material';

interface Props {
  onAdd: (appointment: Appointment) => void;
}

export default function AppointmentForm({ onAdd }: Props) {
  const [clientName, setClientName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [barber, setBarber] = useState('Juan');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newAppointment: Appointment = {
      id: uuidv4(),
      clientName,
      date,
      time,
      status: 'pending',
    };

    onAdd(newAppointment);

    setClientName('');
    setDate('');
    setTime('');
    setBarber('Juan');
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}> {/* Añadimos maxWidth y centrado */}
      <Typography variant="h6" gutterBottom>
        ➕ Nueva Cita
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Cliente"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
          fullWidth
          variant="outlined"
        />

        {/* <Grid container spacing={2}> */}
          
            <TextField
              label="Fecha"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
         
            <TextField
              label="Hora"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
        {/* </Grid> */}

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

        <Button type="submit" variant="contained" color="primary">
          Agendar
        </Button>
      </Box>
    </Paper>
  );
}