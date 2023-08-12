import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { myLogin } from './notesAPI';

export interface loginState {
  status: 'logged' | 'not logged';
  username: string;
  pwd: string;
  userId: number | null; // Add userId property
}

const initialState: loginState = {
  status: 'not logged',
  username: '',
  pwd: '',
  userId: null, // Set an initial value for userId
}

export const loginAsync = createAsyncThunk('login/myLogin', async (cred: any) => {
  const response = await myLogin(cred.user, cred.pwd);
  return { data: response.data, user: cred.user };
});

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLog(state) {
      if(state.status === 'logged')
      state.status = 'not logged';
      else if(state.status === 'not logged')
      state.status = 'logged'
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, actions) => {
      const { data, user } = actions.payload; 
      
      if (data.access !== undefined) {
        state.username = user; 
        state.status = 'logged';
        localStorage.setItem('access', data.access);
      } else {
        state.username = '';
        state.pwd = '';
        state.status = 'not logged';
      }
    });
  },
});

export const { setLog } = loginSlice.actions;
export const selectLogin = (state: RootState) => state.login;
export const selectUser = (state: RootState) => state.login;
export const selectUserId = (state: RootState): number | null => {
  return state.login.userId;
};

export default loginSlice.reducer;
