import { configureStore } from '@reduxjs/toolkit';
import memesReducer from './memesSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    memes: memesReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;