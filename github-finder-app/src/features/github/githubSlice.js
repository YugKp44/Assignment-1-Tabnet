import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const GITHUB_API = 'https://api.github.com';

// Async thunk for searching users
export const searchUsers = createAsyncThunk(
  'github/searchUsers',
  async (username, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${GITHUB_API}/search/users?q=${username}`);
      return response.data.items;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching user details only
export const getUserDetails = createAsyncThunk(
  'github/getUserDetails',
  async (username, { rejectWithValue }) => {
    try {
      const userResponse = await axios.get(`${GITHUB_API}/users/${username}`);
      return userResponse.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching user repositories (top 5 by updated date)
export const getUserRepos = createAsyncThunk(
  'github/getUserRepos',
  async (username, { rejectWithValue }) => {
    try {
      const reposResponse = await axios.get(
        `${GITHUB_API}/users/${username}/repos?per_page=5&sort=updated`
      );
      return reposResponse.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const githubSlice = createSlice({
  name: 'github',
  initialState: {
    users: [],
    user: {},
    repos: [],
    loading: false,
    error: null,
  },
  reducers: {
    // ✅ Add this reducer to clear user list and state
    clearUsers: (state) => {
      state.users = [];
      state.user = {};
      state.repos = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search Users
      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get User Details
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get User Repos
      .addCase(getUserRepos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserRepos.fulfilled, (state, action) => {
        state.loading = false;
        state.repos = action.payload;
      })
      .addCase(getUserRepos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Export the action
export const { clearUsers } = githubSlice.actions;

export default githubSlice.reducer;
