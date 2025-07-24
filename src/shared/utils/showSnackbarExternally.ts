import { AlertColor } from "@mui/material";
import { useEffect } from "react";
import { useSnackbarContext } from "../components/snackbar/SnackbarContext";

let showMessage: (msg: string, sev?: AlertColor) => void = () => {};

export const SnackbarBridge = () => {
  const { showMessage: realShowMessage } = useSnackbarContext();

  useEffect(() => {
    showMessage = realShowMessage;

    const expired = localStorage.getItem("token_expired");
    if (expired) {
      realShowMessage(
        "Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.",
        "warning"
      );

      setTimeout(() => {
        localStorage.removeItem("token_expired");
      }, 1000);
    }
  }, [realShowMessage]);
  return null;
};

export const showTokenExpiredMessage = () => {
  showMessage(
    "Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.",
    "warning"
  );
};
