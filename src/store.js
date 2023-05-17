import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { authApi } from './redux/slices/auth.slice'
import { licensePlateApi } from './redux/slices/licensePlate.slice'

const store = configureStore({
  reducer: {
    [licensePlateApi.reducerPath]: licensePlateApi.reducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(licensePlateApi.middleware, authApi.middleware),
})

export default store
setupListeners(store.dispatch)
