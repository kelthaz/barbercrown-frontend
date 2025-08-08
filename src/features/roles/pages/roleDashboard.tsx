import RolesTable from '../components/roleTable';
import { Box, Paper, Grid, Snackbar, Alert } from '@mui/material';
import { Roles } from '../types/roles';
import { fetchRoles } from '../services/roleService';
import { useState, useEffect } from 'react';
import RoleForm from '../components/roleForm'
import { cancelRol } from '../services/roleService';
import { ConfirmDialog } from '../../../shared/components/dialogs/ConfirmDialog';


export default function RoleDashboard() {
    const [roles, setRoles] = useState<Roles[]>([]);
    const [loading, setLoading] = useState(true);
    const [roleToEdit, setRoleToEdit] = useState<Roles | null>(null);
    const [rolToCancel, setRolToCancel] = useState<Roles | null>(null);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleAddRole = async (newRole: Roles) => {
        await loadRoles();
        setRoleToEdit(null);
    };

    const loadRoles = async () => {
        try {
            setLoading(true);
            const data = await fetchRoles();
            setRoles(data);
        } catch (error) {
            console.error("Error loading roles", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRoles();
    }, []);

    const handleConfirmCancel = async () => {
        if (!rolToCancel) return;
        try {
            await cancelRol(Number(rolToCancel.id));
            setSnackbarMessage('Rol eliminado exitosamente!');
            loadRoles();
        } catch (error) {
            setSnackbarMessage('Error al cancelar la cita');
        } finally {
            setConfirmDialogOpen(false);
            setRolToCancel(null);
            setSnackbarOpen(true);
        }
    };


    const handleCloseSnackbar = () => setSnackbarOpen(false);

    const handleCancelClick = (role: Roles) => {
        setRolToCancel(role);
        setConfirmDialogOpen(true);
    };
    return (
        <Box sx={{ p: { xs: 0, sm: 3 }, width: '100%' }}>
            <Grid container direction="column" alignItems="center" spacing={3}>
                <Paper sx={{ p: 3, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'white', boxShadow: 1 }}>
                    <RoleForm onAdd={handleAddRole} roleToEdit={roleToEdit} />
                </Paper>
                <Grid container direction="column" alignItems="center" spacing={3}>
                    <div style={{ width: '100%' }}>
                        <div style={{ width: '100%' }}>
                            <RolesTable roles={roles} onCancel={handleCancelClick} />

                            <ConfirmDialog
                                open={confirmDialogOpen}
                                title="Eliminar rol?"
                                content="¿Estás seguro que deseas eliminar este rol?"
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
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
}