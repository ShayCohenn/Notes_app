import axios from 'axios';
import { store } from '../app/store';

const API_URL = '/api/notes/';

export interface Note {
  id: number;
  title: string;
  body: string;
  updated: string;
  user: number; // Assuming this represents the user's ID
}

export async function fetchNotes(userId: number): Promise<Note[]> {
  const token = localStorage.getItem('access'); // Get the access token from local storage
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.get(`${API_URL}${userId}/`, { headers });
  return response.data;
}

export async function createNote(userId: number, note: Note): Promise<Note> {
  const token = localStorage.getItem('access'); // Get the access token from local storage
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.post(`${API_URL}${userId}/`, note, { headers });
  return response.data;
}

export async function updateNote(userId: number, note: Note): Promise<Note> {
  const token = localStorage.getItem('access'); // Get the access token from local storage
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const url = `${API_URL}${userId}/${note.id}/`;
  const response = await axios.put(url, note, { headers });
  return response.data;
}

export async function deleteNote(userId: number, id: string): Promise<void> {
  const token = localStorage.getItem('access'); // Get the access token from local storage
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const url = `${API_URL}${userId}/${id}/`;
  await axios.delete(url, { headers });
}

export async function myLogin(user: string, pwd: string) {
  const MY_SERVER = '/api/login/';
  const data = {
    username: user,
    password: pwd,
  };
  return await axios.post(MY_SERVER, data);
}
