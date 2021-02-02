import { createContext, FC, useContext, useMemo, useState } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert, Color } from "@material-ui/lab";

interface ISnackbarContext {
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
  showSuccess: (message: string) => void;
}

const SnackbarContext = createContext<ISnackbarContext>({
  showError: () => undefined,
  showWarning: () => undefined,
  showInfo: () => undefined,
  showSuccess: () => undefined,
});

export const SnackbarContextProvider: FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<Color>("success");

  const showError = (message: string) => {
    setOpen(true);
    setMessage(message);
    setSeverity("error");
  };

  const showWarning = (message: string) => {
    setOpen(true);
    setMessage(message);
    setSeverity("warning");
  };

  const showInfo = (message: string) => {
    setOpen(true);
    setMessage(message);
    setSeverity("info");
  };

  const showSuccess = (message: string) => {
    setOpen(true);
    setMessage(message);
    setSeverity("success");
  };

  const closeSnackbar = () => setOpen(false);

  const memoizedContext: ISnackbarContext = useMemo(() => {
    return {
      showError,
      showWarning,
      showInfo,
      showSuccess,
    };
  }, []);

  return (
    <SnackbarContext.Provider value={memoizedContext}>
      {children}
      <Snackbar
        open={open}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={5000}
      >
        <Alert severity={severity} onClose={closeSnackbar}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
