import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import PersonIcon from '@mui/icons-material/Person';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from '../../../theme/theme';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../shared/hooks/useAppDispatch';
import { logout } from '../../../features/auth/slices/authSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

export default function DashboardShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { mode, toggleColorMode } = useColorMode();
  const icon = mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElAdmin, setAnchorElAdmin] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  const handleAdminToggle = () => {
    setAdminMenuOpen(!adminMenuOpen);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseAdmin = () => {
    setAnchorElAdmin(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuAdmin = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAdmin(event.currentTarget);
  };

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/');
  };

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        BarberCrown
      </Typography>
      <List>
        {[
          { text: 'Inicio', to: '/dashboard', icon: <HomeIcon /> },
          { text: 'Citas', to: '/dashboard/appointments', icon: <CalendarTodayIcon /> },
          { text: 'Perfil', to: '/dashboard/profile', icon: <PersonIcon /> },
          { text: 'Cerrar sesión', to: '/', action: handleLogout, icon: <LogoutIcon /> },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={(e) => {
              handleDrawerToggle();
              if (item.action) {
                item.action(e);
              }
            }} component={Link} to={item.to}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem disablePadding>
          <ListItemButton onClick={handleAdminToggle}>
            <ListItemIcon><AdminPanelSettingsIcon /></ListItemIcon>
            <ListItemText primary="Administrador" />
          </ListItemButton>
        </ListItem>
        {adminMenuOpen && (
          <>
            <ListItem disablePadding sx={{ pl: 4 }}>
              <ListItemButton onClick={handleDrawerToggle} component={Link} to="/dashboard/users">
                <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>
                <ListItemText primary="Usuarios" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ pl: 4 }}>
              <ListItemButton onClick={handleDrawerToggle} component={Link} to="/dashboard/roles">
                <ListItemIcon><AdminPanelSettingsIcon /></ListItemIcon>
                <ListItemText primary="Roles" />
              </ListItemButton>
            </ListItem>
          </>
        )}
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
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' } }}>
            BarberCrown
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2, alignItems: 'center' }}>
            <Button color="inherit" component={Link} to="/dashboard">
              Inicio
            </Button>
            <Button color="inherit" component={Link} to="/dashboard/appointments">
              Citas
            </Button>
            <div>
              <Button color="inherit" onClick={handleMenuAdmin}>
                Administrador
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElAdmin}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElAdmin)}
                onClose={handleCloseAdmin}
              >
                <MenuItem component={Link} to="/dashboard/users"><SupervisorAccountIcon />  Usuarios</MenuItem>
                <MenuItem component={Link} to="/dashboard/roles"><AdminPanelSettingsIcon />  Roles</MenuItem>
              </Menu>
            </div>
            <IconButton onClick={toggleColorMode} color="inherit">
              {icon}
            </IconButton>

            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem component={Link} to="/dashboard/profile"><PersonIcon />  Profile</MenuItem>
                <MenuItem onClick={handleLogout} component={Link} to="/"><LogoutIcon />  Cerrar sesión</MenuItem>
              </Menu>
            </div>
          </Box>
          <IconButton
            onClick={toggleColorMode}
            color="inherit"
            sx={{ display: { xs: 'block', sm: 'none' } }}
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
            keepMounted: true,
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