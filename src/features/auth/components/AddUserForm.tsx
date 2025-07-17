import React, { useState } from 'react';
import { Users } from '../types/users';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Button, Box, Typography, Paper, } from '@mui/material';
import Alert from '../../../shared/components/alerts/Alert';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface Props {
    onAdd: (user: Users) => void;
}

export default function addUserForm() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [profile, setProfile] = useState('Cliente');
    const [password, setPassword] = useState('');
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userName === '' || email === '' || profile === '') {
            setSuccessAlert(false);
            setErrorAlert(true);
        } else {
            const newUser: Users = {
                id: uuidv4(),
                userName,
                email,
                profile,
                password,
                status: 'Activo',
            };

            setSuccessAlert(true)
            setErrorAlert(false);
        }
    };

    return (
        <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
            <PersonAddIcon fontSize="large" />
            <Typography variant="h6" gutterBottom>
                Nuevo usuario
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Nombre de usuario"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
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
                <TextField
                    label="Perfil del usuario"
                    value={profile}
                    onChange={(e) => setProfile('Cliente')}
                    fullWidth
                    variant="outlined"
                    disabled
                />
                <Button type="submit" variant="contained" color="success" >
                    Crear usuario
                </Button>
                {successAlert && <Alert message='Usuario creado con éxito.' error='' />}
                {errorAlert && <Alert message='' error='Faltan campos por completar.' />}
            </Box>
        </Paper>
    );
}