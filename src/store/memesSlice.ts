import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Meme {
  id: string;
  url: string;
  title: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
  category: string;
}

interface MemesState {
  items: Meme[];
  trending: Meme[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MemesState = {
  items: [],
  trending: [],
  status: 'idle',
  error: null,
};

export const fetchMemes = createAsyncThunk('memes/fetchMemes', async () => {
  const response = await axios.get('https://api.imgflip.com/get_memes');
  return response.data.data.memes;
});

const memesSlice = createSlice({
  name: 'memes',
  initialState,
  reducers: {
    likeMeme: (state, action) => {
      const meme = state.items.find(m => m.id === action.payload);
      if (meme) {
        meme.likes += 1;
      }
    },
    addComment: (state, action) => {
      const { memeId, comment } = action.payload;
      const meme = state.items.find(m => m.id === memeId);
      if (meme) {
        meme.comments.push(comment);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMemes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.trending = action.payload.slice(0, 10);
      })
      .addCase(fetchMemes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { likeMeme, addComment } = memesSlice.actions;
export default memesSlice.reducer;