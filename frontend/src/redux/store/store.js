import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authslice'; // Import the authSlice reducer
import adminReducer from "../reducers/adminSlice";
import studentReducer from "../reducers/studentSlice"

// Configure the store
const store = configureStore({
    reducer: {
        auth: authReducer, 
        admin: adminReducer,
        student: studentReducer
    },
});

export default store;
