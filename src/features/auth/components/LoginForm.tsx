import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Alert as MuiAlert,
} from '@mui/material';
import { useAppDispatch } from '../../../shared/hooks/useAppDispatch';
import { useAppSelector } from '../../../shared/hooks/useAppSelector';
import { login } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import ContentCutIcon from '@mui/icons-material/ContentCut';

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }} noValidate>
      <ContentCutIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
      <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
        Iniciar sesión
      </Typography>
      <TextField
        label="Correo electrónico"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Contraseña"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && (
        <MuiAlert severity="error" sx={{ mt: 2 }}>
          {error}
        </MuiAlert>
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="success"
        sx={{ mt: 3 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Iniciar sesión'}
      </Button>
    </Box>
  );
}
