import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define API URL
const API_URL = 'http://localhost:4900/api';

// Login action (asyncThunk)
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, userData, {
        withCredentials: true
      });
      return response.data; // This will be the result of the login
    } catch (error) {
      return rejectWithValue(error.response.data); // If there's an error, return it
    }
  }
);

// Register action (asyncThunk)
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      return response.data; // Registration success data
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);

// Fetch user profile (asyncThunk)
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // User profile data
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async ({ token, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/auth/profile`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Make sure to send form data
        },
      });
      return response.data; // User profile data
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "/auth/forget-password", async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/forget-password`, { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "somthing went wrong")

    }
  }
)

export const verifyCode = createAsyncThunk(
  "/auth/forget-password", async ({ email, code }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/verify-code`, { email, code });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "somthing went wrong")

    }
  }
)

export const resetPassword = createAsyncThunk(
  "/auth/forget-password", async ({ email, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, { email, newPassword });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "somthing went wrong")

    }
  }
)

export const contactUser = createAsyncThunk(
  "/auth/user-contact", async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/contact`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "somthing went wrong")

    }
  }
)

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user'); // Clear localStorage on logout
    },
  },
  extraReducers: (builder) => {
    // Login User
    builder.addCase(loginUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(action.payload.user)); // Save user to localStorage
      localStorage.setItem('token',JSON.stringify(action.payload.token))
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    // Register User
    builder.addCase(registerUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    // Fetch User Profile
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload.user;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
