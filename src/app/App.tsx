import { Routes, Route } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import AppointmentsDashboard from '../features/appointments/pages/AppointmentsDashboard';
import UserDashboard from '../features/users/pages/userDashboard';
import DashboardShell from '../shared/components/layout/DashboardShell';
import { ColorModeProvider } from '../theme/theme';
import RoleDashboard from "../features/roles/pages/roleDashboard"
import PrivateRoute from './PrivateRoute';


export default function App() {
  return (
    <ColorModeProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardShell />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="appointments" element={<AppointmentsDashboard />} />
          <Route path="users" element={<UserDashboard />} />
          <Route path="roles" element={<RoleDashboard />} />
        </Route>
      </Routes>
    </ColorModeProvider>
  );
}
