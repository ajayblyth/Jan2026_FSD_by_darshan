import { createStore, applyMiddleware } from "redux";
// import { thunk } from 'redux-thunk'  ← production import (installed package)

// ─── Manual Thunk Middleware ──────────────────────────────────────────────────
// Redux middleware signature is a triple-curried function:
//   (store) => (next) => (action) => { ... }
//
//   store  — the Redux store, gives access to dispatch & getState
//   next   — the next middleware in the chain (or the real reducer if last)
//   action — whatever was passed to dispatch()
//
// Logic:
//   • If action is a FUNCTION  → it's a thunk; call it with (dispatch, getState)
//   • If action is an OBJECT   → it's a plain action; pass it along with next()

const thunk = (store) => (next) => (action) => {
    if (typeof action === 'function') {
        // Thunk detected — invoke it so it can dispatch plain actions later
        return action(store.dispatch, store.getState)
    }
    // Plain action — forward to the next middleware / reducer as normal
    return next(action)
}

// ─── Initial State ────────────────────────────────────────────────────────────
const initialState = {
    user: null,      // holds fetched user object
    loading: false,  // true while the API call is in-flight
    error: null,     // holds error message if the call failed
}

// ─── Reducer ──────────────────────────────────────────────────────────────────
// Pure function: (currentState, action) → newState
// Responds to the three action types dispatched by the thunk.

function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_USER_START':
            // API call started — show spinner, clear previous error
            return { ...state, loading: true, error: null }

        case 'FETCH_USER_SUCCESS':
            // API call succeeded — store user, hide spinner
            return { ...state, loading: false, user: action.payload }

        case 'FETCH_USER_FAIL':
            // API call failed — store error message, hide spinner
            return { ...state, loading: false, error: action.payload }

        default:
            return state
    }
}

// ─── Store ────────────────────────────────────────────────────────────────────
// applyMiddleware(thunk) wraps dispatch so it can handle function-type actions.
// Without this, dispatching a thunk would throw because reducers expect objects.

const store_async = createStore(userReducer, applyMiddleware(thunk));

export default store_async