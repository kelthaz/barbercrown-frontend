import { ReactNode } from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';

type MyAlertProps = {
  message: ReactNode;
  error: ReactNode;
};

export default function SimpleAlert({ message, error }: MyAlertProps) {
  const alertInfo = error ? {
    severity: 'error' as const,
    icon: <ErrorIcon fontSize="inherit" />,
    content: error,
  }
    : message
      ? {
        severity: 'success' as const,
        icon: <CheckIcon fontSize="inherit" />,
        content: message,
      }
      : null;;


  if (!alertInfo) return null;

  return (
    <Alert icon={alertInfo.icon} severity={alertInfo.severity}>
      {alertInfo.content}
    </Alert>
  );
}
