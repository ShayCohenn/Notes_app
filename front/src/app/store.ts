import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { notesSlice } from '../redux/notesSlice';
import sidebarReducer from '../redux/sidebarSlice';
import darkModeSlice from '../redux/darkModeSlice';
import loginReducer from '../redux/LoginSlicer';

export const store = configureStore({
  reducer: {
    notes: notesSlice.reducer,
    sidebar: sidebarReducer,
    darkMode: darkModeSlice,
    login: loginReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
