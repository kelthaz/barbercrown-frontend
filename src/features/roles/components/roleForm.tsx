import React, { useState } from 'react';
import { Roles } from '../types/roles';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import Alert from '../../../shared/components/alerts/Alert';
import { createRole } from '../services/roleService';

interface Props {
    onAdd: (role: Roles) => void;
    roleToEdit?: Roles | null;
}

export default function roleForm({ onAdd, roleToEdit, }: Props) {
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [lastAction, setLastAction] = useState('');

    const validateForm = () => {
        const errors: { [key: string]: string } = {};
        if (!name.trim()) errors.name = 'El nombre es obligatorio';

        setNameError(errors.name || '');

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

                const newRole = await createRole({
                    name,
                });

                onAdd(newRole);
                setSuccessAlert(true);
                setErrorAlert(false);
            } catch (error) {
                console.error("Error creating role:", error);
                setErrorAlert(true);
                setSuccessAlert(false);
            }
        }
    };


    return (
        <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h6" gutterBottom>
                ➕ Nuevo Rol
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Nombre del rol"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    variant="outlined"
                />

                <Button type="submit" variant="contained" color="primary" >
                    {roleToEdit ? 'Actualizar' : 'Crear rol'}
                </Button>
                {successAlert && <Alert message={
                    lastAction === 'update' ? 'Rol actualizado con exito' : 'Rol creado con exito'} error='' />}
                {errorAlert && <Alert message='' error='Faltan campos por completar.' />}
            </Box>
        </Paper>
    );
}