import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import qaMeetingSlice from "./qaMeetingSlice"

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    qaMeeting: qaMeetingSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
