import { configureStore } from '@reduxjs/toolkit'
import noteSlice from './Slices/note.slice'


export const store = configureStore({
  reducer: {
      noteReducer: noteSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch