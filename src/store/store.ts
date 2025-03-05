import { configureStore } from '@reduxjs/toolkit'
import profileSlice from './ProfileSlice'
import { apiClient } from '../api/ApiClient'

export const store = configureStore({
  reducer: {
    profile: profileSlice,

    [apiClient.reducerPath]: apiClient.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiClient.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch