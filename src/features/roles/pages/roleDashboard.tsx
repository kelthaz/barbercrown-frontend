import RolesTable from '../components/roleTable';
import { Box, Typography, Paper, Grid } from '@mui/material';


export default function RoleDashboard() {
    return (
        <Box sx={{ p: { xs: 0, sm: 3 }, width: '100%' }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                👤 lista de roles
            </Typography>
            <Grid container direction="column" alignItems="center" spacing={3}>
                <div style={{ width: '100%' }}>
                    <div style={{ width: '100%' }}>
                        <RolesTable />
                    </div>
                </div>
            </Grid>
        </Box>
    );
}