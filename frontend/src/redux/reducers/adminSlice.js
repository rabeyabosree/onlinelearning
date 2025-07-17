import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://onlinelearning-5uxm.onrender.com/api";// "http://localhost:4900/api"

export const getAllUsers = createAsyncThunk(
  "/admin/get-users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/admin/users`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong" });
    }
  }
);

export const getAllCourses = createAsyncThunk(
  "/admin/allcourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/admin/courses`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong" });
    }
  }
);

export const addCourses = createAsyncThunk(
  "admin/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/admin/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const getCourseById = createAsyncThunk(
  "admin/course",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/admin/courses/${courseId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong" });
    }
  }
);

export const editCourses = createAsyncThunk(
  "/admin/edit",
  async ({ id, course }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/admin/${id}`, course);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong" });
    }
  }
);

export const createQuiz = createAsyncThunk(
  "/admin/quiz",
  async (quiz, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/admin/quiz`, quiz);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong" });
    }
  }
);

export const deleteCourses = createAsyncThunk(
  "/admin/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/admin/delete/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong" });
    }
  }
);

const initialState = {
  courses: [],
  users: [],
  quizes: [],
  loading: false,
  error: null,
  selectedCourse: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.error = null;
      })
      .addCase(getAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.data;
        state.error = null;
      })
      .addCase(editCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editCourses.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCourse = action.payload;
        state.courses = state.courses.map((course) => {
          return course._id === updatedCourse._id ? updatedCourse : course;
        });
        state.error = null;
      })
      .addCase(addCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Something went wrong';
      })
      .addCase(addCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = [...state.courses, action.payload];
        state.error = null;
      })
    .addCase(getCourseById.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getCourseById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getCourseById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedCourse = action.payload;
      state.error = null;
    })
    .addCase(createQuiz.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createQuiz.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(createQuiz.fulfilled, (state, action) => {
      state.loading = false;
      state.quizes = [...state.quizes, action.payload];
      state.error = null;
    })
    .addCase(deleteCourses.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteCourses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteCourses.fulfilled, (state, action) => {
      state.loading = false;
      state.courses = state.courses.filter((course) => course._id !== action.payload._id); // Updated comparison
      state.error = null;
    });
},
});

export default adminSlice.reducer;

