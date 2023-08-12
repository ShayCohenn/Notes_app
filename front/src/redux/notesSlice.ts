import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import * as API from './notesAPI';
import { Draft } from 'immer';
import { selectUserId } from './LoginSlicer'; 

export interface Note {
  id: number;
  title: string;
  body: string;
  updated: string;
  user: number;
}

interface NotesState {
  notes: Note[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: NotesState = {
  notes: [],
  status: 'idle', 
};

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async (_, thunkAPI) => {
  const userId = selectUserId(thunkAPI.getState() as RootState);
  
  if (userId !== null) {
    const notes = await API.fetchNotes(userId);
    return notes;
  }

  return [];
});

export const addNote = createAsyncThunk('notes/addNote', async (note: Note, thunkAPI) => {
  const userId = selectUserId(thunkAPI.getState() as RootState);

  if (userId !== null) {
    const newNote = await API.createNote(userId, note);
    return newNote;
  }

  throw new Error('User is not logged in'); // Handle this appropriately
});

export const updateNoteAsync = createAsyncThunk('notes/updateNote', async (note: Note, thunkAPI) => {
  const userId = selectUserId(thunkAPI.getState() as RootState);

  if (userId !== null) {
    const updatedNote = await API.updateNote(userId, note);
    return updatedNote;
  }

  throw new Error('User is not logged in'); // Handle this appropriately
});

export const deleteNoteAsync = createAsyncThunk('notes/deleteNote', async (id: number, thunkAPI) => {
  const userId = selectUserId(thunkAPI.getState() as RootState);

  if (userId !== null) {
    await API.deleteNote(userId, id.toString());
    return id;
  }

  throw new Error('User is not logged in'); // Handle this appropriately
});


export const selectNoteById = (state: RootState, noteId: number): Note | undefined =>
  state.notes.notes.find(n => n.id === noteId);

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes = action.payload as Draft<Note>[];
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload as Draft<Note>); // Add the new note to the state
        console.log('Note created:', action.payload); // Log the created note
      })
      .addCase(updateNoteAsync.fulfilled, (state, action) => {
        const updatedNote = action.payload; // Updated note from action payload
        const existingNoteIndex = state.notes.findIndex(n => n.id === updatedNote.id);

        if (existingNoteIndex !== -1) {
          state.notes[existingNoteIndex] = updatedNote; // Replace the old note with the updated note
          console.log('Note updated:', updatedNote);
        }
      })
  },
});
export default notesSlice.reducer;
