import React, { useState, useEffect } from 'react';
import { Users } from '../types/users';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, Paper } from '@mui/material';
import Alert from '../../../shared/components/alerts/Alert';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Roles } from '../../roles/types/roles';
import { fetchRoles } from '../../roles/services/roleService';
import { createUser } from '../../users/services/userService';

interface Props {
    onAdd: (user: Users) => void;
}

export default function addUserForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profile, setProfile] = useState('Cliente');
    const [password, setPassword] = useState('');
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [phone, setPhone] = useState('');
    const [roles, setRoles] = useState<Roles[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRole, setSelectedRole] = useState<number>(1);

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
                // onAdd(newUser);
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
            <PersonAddIcon fontSize="large" />
            <Typography variant="h6" gutterBottom>
                Nuevo usuario
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
                    value={password}
                    type='password'
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
                <Button type="submit" variant="contained" color="success" >
                    Crear usuario
                </Button>
                {successAlert && <Alert message='Usuario creado con éxito.' error='' />}
                {errorAlert && <Alert message='' error='Faltan campos por completar.' />}
            </Box>
        </Paper>
    );
}