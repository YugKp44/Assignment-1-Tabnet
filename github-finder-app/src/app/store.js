import { configureStore } from '@reduxjs/toolkit';
import githubReducer from '../features/github/githubSlice';

export const store = configureStore({
    reducer: {
        github: githubReducer,
    },
});