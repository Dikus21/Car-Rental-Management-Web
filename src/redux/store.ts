import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
  }
});
// Export RootState and AppDispatch types for TypeScript
export type RootState = ReturnType<typeof store.getState>;

export default store;
