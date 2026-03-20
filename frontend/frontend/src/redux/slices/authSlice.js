import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, { rejectWithValue }) => {
    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Login failed");

        localStorage.setItem("token", data.token);
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Logout action
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
    localStorage.removeItem("token");
    return null;
});

// Slice definition
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
            });
    },
});

export default authSlice.reducer;
