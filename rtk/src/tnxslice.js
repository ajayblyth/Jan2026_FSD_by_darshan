// ─── Transaction Slice ────────────────────────────────────────────────────────
// Manages the transaction history array independently from the user slice.
// Splitting into two slices keeps each reducer focused and avoids one giant
// state object — this is the RTK "slice per feature" pattern.

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    transactions: []   // array of { amount, type, date } objects
}

const tnxSlice = createSlice({
    name: "tnx",       // action types → "tnx/addTnx", "tnx/removeTnx", "tnx/clearAll"
    initialState,
    reducers: {

        // action.payload = { amount, type, date }
        // .push() looks like a mutation but Immer keeps it immutable under the hood
        addTnx(state, action) {
            state.transactions.push(action.payload)
        },

        // action.payload = index of the transaction to remove
        // .splice() is also safe here because of Immer
        removeTnx(state, action) {
            state.transactions.splice(action.payload, 1)
        },

        // no payload — wipes the entire history
        clearAll(state) {
            state.transactions = []
        }
    }
})

export default tnxSlice.reducer

export const { addTnx, removeTnx, clearAll } = tnxSlice.actions