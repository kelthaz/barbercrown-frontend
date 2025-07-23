import React, { useState, useEffect } from 'react';
import { Users } from '../types/users';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, Paper } from '@mui/material';
import Alert from '../../../shared/components/alerts/Alert';
import { fetchRoles } from '../../roles/services/roleService';
import { Roles } from '../../roles/types/roles';

interface Props {
  onAdd: (user: Users) => void;
}

export default function userForm({ onAdd }: Props) {
  const [name, setName] = useState('');
  const [roles, setRoles] = useState<Roles[]>([]);
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [password, setPassword] = useState('');
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name === '' || email === '' || selectedRole === '') {
      setSuccessAlert(false);
      setErrorAlert(true);
    } else {
      setSuccessAlert(true)
      setErrorAlert(false);
    }
  };

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const data = await fetchRoles();
        setRoles(data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRoles();
  }, []);

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        ➕ Nuevo usuario
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Nombre de usuario"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          variant="outlined"
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel id="barber-label">Rol del usuario</InputLabel>
          <Select
            labelId="barber-label"
            id="profile"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            label="Rol del usuario"
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>


        <Button type="submit" variant="contained" color="primary" >
          Crear usuario
        </Button>
        {successAlert && <Alert message='Usuario creado con éxito.' error='' />}
        {errorAlert && <Alert message='' error='Faltan campos por completar.' />}
      </Box>
    </Paper>
  );
}