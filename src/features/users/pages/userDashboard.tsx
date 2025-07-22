import { useState } from 'react';
import UsersForm from '../components/userForm';
import UsersTable from '../components/userTable';
import { Users } from '../types/users';
import { Box, Typography, Paper, Grid } from '@mui/material';


export default function userDashboard() {
  const [users, setUsers] = useState<Users[]>([]);

  const handleAddUser = (users: Users) => {
    setUsers((prev) => [...prev, users]);
  };


  return (
    <Box sx={{ p: { xs: 0, sm: 3 }, width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        👤 Crear un usuario nuevo
      </Typography>

      <Grid container direction="column" alignItems="center" spacing={3}>

        <Paper sx={{ p: 3, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'white', boxShadow: 1 }}>
          <UsersForm onAdd={handleAddUser} />
        </Paper>

        <div style={{ width: '100%' }}>
          <div style={{ width: '100%' }}>
            <UsersTable />
          </div>
        </div>
      </Grid>
    </Box>
  );
}