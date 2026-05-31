// ─── Sync Action Creators ────────────────────────────────────────────────────
// Plain action creators return a plain object { type, payload? }.
// Redux can handle these directly — no middleware needed.

export const fetchUserStart = () => ({ type: "FETCH_USER_START" })
export const fetchUserSuccess = (user) => ({ type: "FETCH_USER_SUCCESS", payload: user })
export const fetchUserFail = (message) => ({ type: "FETCH_USER_FAIL", payload: message })

// ─── Thunk Action Creator ─────────────────────────────────────────────────────
// A thunk action creator returns a FUNCTION instead of a plain object.
// redux-thunk middleware intercepts it and calls that inner function,
// injecting (dispatch, getState) so it can:
//   • read current state via getState()
//   • dispatch multiple plain actions over time (start → success/fail)
//
// Shape:
//   fetchUser(userId)          ← outer function, called by component
//     └─ async (dispatch, getState) => { ... }   ← inner function, called by thunk middleware

export const fetchUser = (userId) => async (dispatch, getState) => {

    // getState() returns the entire Redux store snapshot at this moment.
    // Use it to avoid redundant network requests (caching check).
    const currentUser = getState().user
    if (currentUser && currentUser.id === userId) {
        console.log("User already loaded")
        return  // bail out early — data is already in the store
    }

    // Step 1 — signal that loading has begun (sets loading: true in reducer)
    dispatch(fetchUserStart())

    try {
        // Step 2 — perform the async work (API call)
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        const data = await res.json()

        // Step 3a — success: push data into the store
        dispatch(fetchUserSuccess(data))
    }
    catch (error) {
        // Step 3b — failure: push error message into the store
        dispatch(fetchUserFail(error.message))
    }
}