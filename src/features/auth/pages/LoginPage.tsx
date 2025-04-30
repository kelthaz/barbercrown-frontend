// src/features/auth/pages/LoginPage.tsx
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm">
        <h2 className="text-2xl mb-4 font-semibold text-center">Iniciar sesión</h2>
        <LoginForm />
      </div>
    </div>
  );
}
