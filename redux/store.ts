import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'; 
import saasSlice from './slices/saasSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    saas: saasSlice
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
