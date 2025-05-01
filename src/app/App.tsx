import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import PrivateRoute from '../shared/components/PrivateRoute';
import AppointmentsDashboard from '../features/appointments/pages/AppointmentsDashboard';
import DashboardShell from '../shared/components/layout/DashboardShell';
import { ColorModeProvider } from '../theme/theme';

const Home = () => {
  return <h1 className="text-3xl text-center mt-20">🏠 Página principal</h1>;
};

export default function App() {
  return (
    <BrowserRouter>
      <ColorModeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardShell />}>
            <Route index element={<DashboardPage />} />
            <Route path="appointments" element={<AppointmentsDashboard />} />
          </Route>
        </Routes>
      </ColorModeProvider>
    </BrowserRouter>
  );
}
