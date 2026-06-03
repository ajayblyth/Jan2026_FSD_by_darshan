// ─── RTK Store ────────────────────────────────────────────────────────────────
// configureStore replaces the old createStore + combineReducers + applyMiddleware
// pattern from vanilla Redux. Under the hood it:
//   • Automatically combines the slice reducers you provide
//   • Adds redux-thunk middleware by default (no manual setup needed)
//   • Enables Redux DevTools Extension in development
//   • Turns on immutability & serializability checks (dev-only warnings)

import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import tnxReducer from './tnxslice'
import usersReducer from './usersSlice'
// The keys in `reducer` become the top-level keys of the Redux state tree:
//   store.getState() → { user: {...}, tnxs: {...} }
// Components access these slices via useSelector((state) => state.user / state.tnxs)

const store = configureStore({
    reducer: {
        user: userReducer,   // manages user profile + balance
        tnxs: tnxReducer,     // manages transaction history
        users: usersReducer
    }
})

export default store