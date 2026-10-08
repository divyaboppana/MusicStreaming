import { useState, FormEvent } from 'react';
import { Typography, TextField, Button, Alert, Box, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { register, clearAuthError } from '../features/auth/authSlice';
import { showToast } from '../features/ui/uiSlice';
import { AuthScreen, AuthCard, AuthLogo } from './Auth.styles';

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useAppSelector((s) => s.auth);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(clearAuthError());
    const result = await dispatch(register({ userName, email, password }));
    if (register.fulfilled.match(result)) {
      dispatch(showToast({ message: 'Account created. Please log in.' }));
      navigate('/login');
    }
  };

  return (
    <AuthScreen>
      <AuthCard component="form" onSubmit={handleSubmit}>
        <AuthLogo>W</AuthLogo>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          Create your account
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          New accounts get the standard "User" role, with full control over your own playlists.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Username"
          fullWidth
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Creating account...' : 'Sign up'}
        </Button>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <MuiLink component={Link} to="/login" underline="hover">
              Log in
            </MuiLink>
          </Typography>
        </Box>
      </AuthCard>
    </AuthScreen>
  );
}
