import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import PersonIcon from '@mui/icons-material/Person';
import StyleIcon from '@mui/icons-material/Style';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from '../../../theme/theme'; // Ajusta la ruta

export default function DashboardShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { mode, toggleColorMode } = useColorMode(); // Obtén el modo y la función del contexto
  const icon = mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />; // Define el icono según el modo

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        BarberCrown
      </Typography>
      <List>
        {[
          { text: 'Inicio', to: '/dashboard', icon: <HomeIcon /> },
          { text: 'Citas', to: '/dashboard/appointments', icon: <CalendarTodayIcon /> },
          { text: 'Barberos', to: '/dashboard/barbers', icon: <ContentCutIcon /> },
          { text: 'Perfil', to: '/dashboard/profile', icon: <PersonIcon /> },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.to}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
        color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'grey.900',
      }}
    >
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }} // Ocultar en pantallas pequeñas y superiores
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' } }}>
            BarberCrown
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2, alignItems: 'center' }}> {/* Añadimos alignItems: 'center' */}
            <Button color="inherit" component={Link} to="/dashboard">
              Inicio
            </Button>
            <Button color="inherit" component={Link} to="/dashboard/appointments">
              Citas
            </Button>
            <Button color="inherit" component={Link} to="/dashboard/barbers">
              Barberos
            </Button>
            <Button color="inherit" component={Link} to="/dashboard/profile">
              Perfil
            </Button>
            <IconButton onClick={toggleColorMode} color="inherit"> {/* Botón de modo oscuro */}
              {icon}
            </IconButton>
          </Box>
          <IconButton
            onClick={toggleColorMode}
            color="inherit"
            sx={{ display: { xs: 'block', sm: 'none' } }} // Mostrar en extra pequeñas
          >
            {icon}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          p: 3,
          maxWidth: 'xl',
          mx: 'auto',
          flexGrow: 1,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}