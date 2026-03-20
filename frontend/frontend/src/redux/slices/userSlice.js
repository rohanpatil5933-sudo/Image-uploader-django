import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    user: null,
    loading: false,
    error: null,
};

// Fetch user profile
export const fetchUserProfile = createAsyncThunk("user/fetchUserProfile", async (_, { rejectWithValue }) => {
    try {
        const response = await fetch("http://localhost:5000/api/users/profile", {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch user profile");
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Update user profile
export const updateUserProfile = createAsyncThunk("user/updateUserProfile", async (userData, { rejectWithValue }) => {
    try {
        const response = await fetch("http://localhost:5000/api/users/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to update profile");
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Slice definition
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;
