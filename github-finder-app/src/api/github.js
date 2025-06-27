import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const GITHUB_API = 'https://api.github.com';

// Async thunk for searching users by username query
export const searchUsers = createAsyncThunk(
  'github/searchUsers',
  async (username, { rejectWithValue }) => {
    try {
      // Send GET request to GitHub Search API
      const response = await axios.get(`${GITHUB_API}/search/users?q=${username}`);
      return response.data.items; // Return array of user items
    } catch (error) {
      // Pass API error to reducer
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching a single user's details
export const getUserDetails = createAsyncThunk(
  'github/getUserDetails',
  async (username, { rejectWithValue }) => {
    try {
      // GET user profile endpoint
      const userResponse = await axios.get(`${GITHUB_API}/users/${username}`);
      return userResponse.data; // Return user object
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching top 5 repos by last update time
export const getUserRepos = createAsyncThunk(
  'github/getUserRepos',
  async (username, { rejectWithValue }) => {
    try {
      // GET repos with per_page=5 and sort by updated timestamp
      const reposResponse = await axios.get(
        `${GITHUB_API}/users/${username}/repos?per_page=5&sort=updated`
      );
      return reposResponse.data; // Return array of repos
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define the slice for GitHub-related state
const githubSlice = createSlice({
  name: 'github',
  initialState: {
    users: [],      // List of search results
    user: {},       // Single user details
    repos: [],      // User's repositories
    loading: false, // Global loading flag
    error: null,    // Error message if any
  },
  reducers: {
    // Action to clear all user-related state
    clearUsers: (state) => {
      state.users = [];
      state.user = {};
      state.repos = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle searchUsers lifecycle
      .addCase(searchUsers.pending, (state) => {
        state.loading = true; // Show loader
        state.error = null;   // Reset error
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.loading = false;       // Hide loader
        state.users = action.payload; // Populate users list
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store error message
      })

      // Handle getUserDetails lifecycle
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Populate user detail
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle getUserRepos lifecycle
      .addCase(getUserRepos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserRepos.fulfilled, (state, action) => {
        state.loading = false;
        state.repos = action.payload; // Populate repos array
      })
      .addCase(getUserRepos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the clearUsers action for components to reset state
export const { clearUsers } = githubSlice.actions;

export default githubSlice.reducer;
