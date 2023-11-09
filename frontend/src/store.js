// store.js
import { configureStore } from '@reduxjs/toolkit';
import { jobApiSlice } from './slices/jobApiSlice';
import { userApiSlice } from './slices/userApiSlice';
import authReducer from './slices/authApiSlice';

const  store = configureStore({
  reducer: {
    [jobApiSlice.reducerPath]: jobApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    auth: authReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobApiSlice.middleware, userApiSlice.middleware),
});

export default store
