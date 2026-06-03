// ─── createAsyncThunk ─────────────────────────────────────────────────────────
// RTK's built-in way to handle async operations (API calls, etc.)
// Replaces the manual thunk pattern (actions_async.js / store_async.js).
//
// createAsyncThunk(actionTypePrefix, payloadCreator)
//
//   actionTypePrefix  — base string for the 3 auto-generated action types:
//                         "users/fetchUsers/pending"
//                         "users/fetchUsers/fulfilled"
//                         "users/fetchUsers/rejected"
//
//   payloadCreator    — async function that does the actual work.
//                       • Whatever it RETURNS becomes action.payload in fulfilled.
//                       • If it THROWS, the error becomes action.error in rejected.
//                       • Receives (arg, thunkAPI) — thunkAPI gives dispatch,
//                         getState, rejectWithValue, etc. if needed.
//
// Returns a thunk action creator (fetchUsers) that dispatches the 3 lifecycle
// actions automatically — no manual START/SUCCESS/FAIL action creators needed.

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ─── Initial State ────────────────────────────────────────────────────────────
// status uses a string enum instead of a boolean `loading` flag so components
// can distinguish between "never fetched" (idle) and "fetching" (loading).
const initialState = {
    users: [],
    status: 'idle',   // 'idle' | 'loading' | 'completed' | 'error'
    error: null,
}

// ─── Thunk Action Creator ─────────────────────────────────────────────────────
// fetchUsers() — dispatching this triggers the payloadCreator below.
// RTK auto-dispatches:
//   1. fetchUsers.pending   → before the async work starts
//   2. fetchUsers.fulfilled → when the promise resolves  (return value = payload)
//   3. fetchUsers.rejected  → when the promise rejects   (error = action.error)

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",        // action type prefix
    async () => {              // payloadCreator — no arg needed here
        const res = await fetch("https://jsonplaceholder.typicode.com/users")
        const data = await res.json()
        return data            // becomes action.payload in the fulfilled case
    }
)

// ─── Slice ────────────────────────────────────────────────────────────────────
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},   // no synchronous actions needed for this slice

    // extraReducers — handles actions generated OUTSIDE this slice.
    // Used here to respond to the 3 lifecycle actions from createAsyncThunk.
    // builder pattern is preferred over the object shorthand (better TS support).
    extraReducers: (builder) => {

        // Fired immediately when fetchUsers() is dispatched — show spinner
        builder.addCase(fetchUsers.pending, (state) => {
            state.status = 'loading'
        })

        // Fired when the payloadCreator resolves — store the data
        // action.payload = the array returned by the payloadCreator
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'completed'
            state.users = action.payload
        })

        // Fired when the payloadCreator throws — store the error message
        // action.error is a SerializedError object; .message is its string
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.error.message
        })
    }
})

export default usersSlice.reducer