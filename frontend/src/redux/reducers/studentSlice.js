import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4900/api/student";

// Async thunk to get quizzes
export const getQuizs = createAsyncThunk(
    "/student/get-quizs",
    async (courseId, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await axios.get(`${API_URL}/quizes/${courseId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getQuiz = createAsyncThunk(
    "/student/get-quiz",
    async (id, { rejectWithValue }) => {
        try {

            const response = await axios.get(`${API_URL}/quizes/${id} `);
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const submitQuiz = createAsyncThunk(
    "/student/submit-quiz",
    async ({ courseId, answers }, { rejectWithValue }) => {
        try {

            const response = await axios.post(`${API_URL}/quizes/submit`, { courseId, answers });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getNotification = createAsyncThunk(
    "/student/get-notification",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/notifications`,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Initial state
const initialState = {
    quizess: [],
    quiz: [],
    score: 0,
    notification: [],
    error: null,
    loading: false,
};

// Slice
const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getQuizs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getQuizs.fulfilled, (state, action) => {
                state.loading = false;
                state.quizess = action.payload;
            })
            .addCase(getQuizs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getQuiz.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getQuiz.fulfilled, (state, action) => {
                state.loading = false;
                state.quiz = action.payload;
            })
            .addCase(getQuiz.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getNotification.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;

            })
            .addCase(getNotification.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.notification = action.payload;
            })
            .addCase(submitQuiz.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitQuiz.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;

            })
            .addCase(submitQuiz.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.score = action.payload.score;
            })
    },
});

export default studentSlice.reducer;
