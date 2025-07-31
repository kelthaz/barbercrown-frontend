import { useState, useEffect } from 'react';
import UsersForm from '../components/userForm';
import UsersTable from '../components/userTable';
import { Users } from '../types/users';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { fetchUsers } from '../services/userService';

export default function userDashboard() {
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);
    const [userToEdit, setUserToEdit] = useState<Users | null>(null);

  const handleAddUser = (newUser: Users) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error loading users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Box sx={{ p: { xs: 0, sm: 3 }, width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        👤 Crear un usuario nuevo
      </Typography>

      <Grid container direction="column" alignItems="center" spacing={3}>

        <Paper sx={{ p: 3, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'white', boxShadow: 1 }}>
          <UsersForm onAdd={handleAddUser} userToEdit={userToEdit}/>
        </Paper>

        <div style={{ width: '100%' }}>
          <div style={{ width: '100%' }}>
            <UsersTable users={users}  onEdit={(appt) => setUserToEdit(appt)} />
          </div>
        </div>
      </Grid>
    </Box>
  );
}