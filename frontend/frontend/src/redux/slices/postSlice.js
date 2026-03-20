import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    posts: [],
    post: null,
    loading: false,
    error: null,
};

// Fetch all posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_, { rejectWithValue }) => {
    try {
        const response = await fetch("http://localhost:5000/api/posts");
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch posts");
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Fetch single post by ID
export const fetchPostById = createAsyncThunk("posts/fetchPostById", async (postId, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:5000/api/posts/${postId}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch post");
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Like a post
export const likePost = createAsyncThunk("posts/likePost", async (postId, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to like post");
        return { postId, likes: data.likes };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Unlike a post
export const unlikePost = createAsyncThunk("posts/unlikePost", async (postId, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:5000/api/posts/${postId}/unlike`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to unlike post");
        return { postId, likes: data.likes };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Slice definition
const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchPostById.fulfilled, (state, action) => {
                state.post = action.payload;
            })
            .addCase(likePost.fulfilled, (state, action) => {
                const { postId, likes } = action.payload;
                const post = state.posts.find((p) => p._id === postId);
                if (post) post.likes = likes;
            })
            .addCase(unlikePost.fulfilled, (state, action) => {
                const { postId, likes } = action.payload;
                const post = state.posts.find((p) => p._id === postId);
                if (post) post.likes = likes;
            });
    },
});

export default postSlice.reducer;
