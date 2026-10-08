import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../api/authApi';
import { AuthUser } from '../../types';

interface AuthState {
  user: AuthUser | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

function loadFromStorage(): AuthUser | null {
  const raw = localStorage.getItem('auth');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

const initialState: AuthState = {
  user: loadFromStorage(),
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      return await authApi.login(payload.email, payload.password);
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || 'Invalid email or password'
      );
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    payload: { userName: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      return await authApi.register(payload.userName, payload.email, payload.password);
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || 'Could not register. Try again.'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem('auth');
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthUser>) => {
        state.status = 'idle';
        state.user = action.payload;
        localStorage.setItem('auth', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Login failed';
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Registration failed';
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
