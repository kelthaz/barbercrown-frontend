import { Box, Container, Paper, Button } from '@mui/material';
import LoginForm from '../components/LoginForm';
import { useAppSelector } from '../../../shared/hooks/useAppSelector';
import AddUserForm from '../components/AddUserForm';
import { useState, useEffect } from 'react';
import { useSnackbarContext } from '../../../shared/components/snackbar/SnackbarContext';

export default function LoginPage() {
  const { loading, error, token } = useAppSelector((state) => state.auth);
  const [addUserForm, setAddUserForm] = useState(true);

  const { showMessage } = useSnackbarContext();

  useEffect(() => {
    const tokenExpired = localStorage.getItem("token_expired");
    if (tokenExpired) {
      setTimeout(() => {
        showMessage(
          "Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.",
          "warning"
        );
        localStorage.removeItem("token_expired");
      }, 100);
    }
  }, [showMessage]);


  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: 'grey.100',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          {addUserForm ?
            <Box>
              <LoginForm />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                onClick={() => setAddUserForm(false)}
              >
                Registrarse
              </Button>
            </Box> :
            <Box>
              <AddUserForm />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                onClick={() => setAddUserForm(true)}
              >
                Volver
              </Button>
            </Box>
          }
        </Paper>
      </Container>
    </Box>
  );
}
