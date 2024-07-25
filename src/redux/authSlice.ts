import { IUser } from '../hooks/userTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  isAdmin: boolean;
  isInitialize: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isAdmin: false,
  isInitialize: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<IUser>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isAdmin = action.payload.role !== 'USER';
      state.isInitialize = true;
    },
    resetAuthUser() {
      return initialState;
    }
  }
});

export const { setAuthUser, resetAuthUser } = authSlice.actions;
export default authSlice.reducer;
