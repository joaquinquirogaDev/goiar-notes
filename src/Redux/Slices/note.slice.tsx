import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface AddNoteState {
  id: string | number;
  title: string;
  type: string;
  description: string;
  date?: string;
}

interface RemoveNote {
    id: string | number
}

const initialState: AddNoteState[] = JSON.parse(localStorage.getItem('notes') || '[]')


export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<AddNoteState>) => {
      const data = [...state, action.payload]
      localStorage.setItem('notes', JSON.stringify(data))
      return data
    },
    removeNote: (state, action: PayloadAction<RemoveNote>) => {
      const {id} = action.payload
      const filter = state.filter(item => item.id !== id)
      localStorage.setItem('notes', JSON.stringify(filter))
      return filter
    },
  }
})

export const { addNote, removeNote} = noteSlice.actions

export default noteSlice.reducer