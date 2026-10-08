import { Snackbar, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { hideToast } from '../../features/ui/uiSlice';

export default function Toast() {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((s) => s.ui.toast);

  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={3000}
      onClose={() => dispatch(hideToast())}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={() => dispatch(hideToast())}
        severity={toast.severity}
        variant="filled"
        sx={{ borderRadius: 2 }}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );
}
