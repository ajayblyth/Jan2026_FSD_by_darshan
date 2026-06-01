// ─── RTK Slice ────────────────────────────────────────────────────────────────
// createSlice bundles three things that vanilla Redux kept separate:
//   1. initialState
//   2. Reducer function (the switch/case block)
//   3. Action creators (one auto-generated per reducer key)
//
// createSlice({
//   name        : prefix for auto-generated action type strings  → "user/deposit"
//   initialState: the slice's default state
//   reducers    : object of { actionName(state, action) } functions
// })
// Returns → { reducer, actions, ... }
//
// ⚠️  Mutating `state` directly is SAFE here.
// RTK wraps every reducer with Immer, which intercepts the "mutation",
// builds a new immutable copy behind the scenes, and returns that.
// You do NOT need to spread: { ...state, balance: state.balance + action.payload }

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    fullName: '',
    mobile: null,
    balance: 0,
}

const userSlice = createSlice({
    name: 'user',         // action types will look like "user/deposit", "user/reset", etc.
    initialState,
    reducers: {

        // action.payload = new name string
        updateFullName(state, action) {
            state.fullName = action.payload   // Immer makes this mutation safe
        },

        // action.payload = new mobile number
        updateMobile(state, action) {
            state.mobile = action.payload
        },

        // action.payload = amount to add
        deposit(state, action) {
            state.balance += action.payload
        },

        // action.payload = amount to subtract
        withdraw(state, action) {
            state.balance -= action.payload
        },

        // no payload needed — resets all fields to initial values
        reset(state) {
            state.fullName = ''
            state.mobile = null
            state.balance = 0
        }
    }
})

// userSlice.reducer  → the combined reducer function (passed to configureStore)
// userSlice.actions  → { updateFullName, updateMobile, deposit, withdraw, reset }
//                       each is an action creator:  deposit(500) → { type: "user/deposit", payload: 500 }

export default userSlice.reducer

export const { updateFullName, updateMobile, deposit, withdraw, reset } = userSlice.actions