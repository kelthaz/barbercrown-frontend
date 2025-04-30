// src/shared/components/PrivateRoute.tsx
import { useAppSelector } from '../hooks/useAppSelector';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useAppSelector((state) => state.auth);

  if (token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
