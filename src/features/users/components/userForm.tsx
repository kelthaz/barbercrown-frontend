import React, { useState, useEffect } from 'react';
import { Users } from '../types/users';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, Paper } from '@mui/material';
import Alert from '../../../shared/components/alerts/Alert';
import { fetchRoles } from '../../roles/services/roleService';
import { Roles } from '../../roles/types/roles';
import { createUser } from '../services/userService';

interface Props {
  onAdd: (user: Users) => void;
}

export default function userForm({ onAdd }: Props) {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [roles, setRoles] = useState<Roles[]>([]);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [selectedRole, setSelectedRole] = useState<number>(1);
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!name.trim()) errors.name = 'El nombre es obligatorio';
    if (!email.trim()) errors.email = 'El correo electrónico es obligatorio';
    if (!password.trim()) errors.password = 'La contraseña es obligatoria';
    if (phone.length < 10) errors.phone = 'El número debe tener al menos 10 caracteres';
    if (phone.length > 10) errors.phone = 'El número debe tener al menos 10 caracteres';
    if (password.length < 6) errors.password = 'El número debe tener al menos 10 caracteres';

    setNameError(errors.name || '');
    setEmailError(errors.email || '');
    setPhoneError(errors.phone || '');
    setPasswordError(errors.password || '');

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    const isValid = validateForm();
    if (!isValid) {
      setSuccessAlert(false);
      setErrorAlert(true);
      return;
    }
    if (valid) {
      try {
        const newUser = await createUser({
          name, email, rol_id: selectedRole, password, estado: 1, phone
        });
        onAdd(newUser);
        setSuccessAlert(true);
        setErrorAlert(false);
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
      } catch (error) {
        console.error("Error creating user:", error);
        setErrorAlert(true);
        setSuccessAlert(false);
      }
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
          error={!!nameError}
          helperText={nameError}
        />
        <TextField
          label="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          variant="outlined"
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          label="Teléfono"
          value={phone}
          error={!!phoneError}
          helperText={
            phoneError
              ? `${phoneError} (${phone.length}/10)`
              : `${phone.length}/10 dígitos`
          }
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          variant="outlined"
          type='number'
        />
        <TextField
          label="Contraseña"
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          variant="outlined"
          error={!!passwordError}
          helperText={
            passwordError
              ? `${passwordError} (${password.length}/6)`
              : `${password.length}/6 dígitos`
          }
        />
        {roles.length > 0 && (
          <FormControl fullWidth variant="outlined">
            <InputLabel id="barber-label">Rol del usuario</InputLabel>
            <Select
              labelId="barber-label"
              id="profile"
              value={selectedRole}
              onChange={(e) => setSelectedRole(Number(e.target.value))} // ✅ conversión correcta
              label="Rol del usuario"
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Button type="submit" variant="contained" color="primary" >
          Crear usuario
        </Button>
        {successAlert && <Alert message='Usuario creado con éxito.' error='' />}
        {errorAlert && <Alert message='' error='Faltan campos por completar.' />}
      </Box>
    </Paper>
  );
}