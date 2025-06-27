import { configureStore } from '@reduxjs/toolkit';  // Simplified Redux setup
import githubReducer from '../api/github';               // Import GitHub slice reducer

// Create and export the Redux store
export const store = configureStore({
  reducer: {
    github: githubReducer,  // Attach GitHub slice under "github" key
  },
});
