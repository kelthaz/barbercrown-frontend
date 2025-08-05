import RolesTable from '../components/roleTable';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { Roles } from '../types/roles';
import { fetchRoles } from '../services/roleService';
import { useState, useEffect } from 'react';
import RoleForm from '../components/roleForm'


export default function RoleDashboard() {
    const [roles, setRoles] = useState<Roles[]>([]);
    const [loading, setLoading] = useState(true);
    const [roleToEdit, setRoleToEdit] = useState<Roles | null>(null);

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
    return (
        <Box sx={{ p: { xs: 0, sm: 3 }, width: '100%' }}>
            <Grid container direction="column" alignItems="center" spacing={3}>
                <Paper sx={{ p: 3, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'white', boxShadow: 1 }}>
                    <RoleForm onAdd={handleAddRole} roleToEdit={roleToEdit} />
                </Paper>
                <Grid container direction="column" alignItems="center" spacing={3}>
                    <div style={{ width: '100%' }}>
                        <div style={{ width: '100%' }}>
                            <RolesTable roles={roles} />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
}