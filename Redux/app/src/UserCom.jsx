// ─── UserCom — Thunk Consumer Component ──────────────────────────────────────
// This component reads async state from the Redux store and triggers a thunk.
//
// Data flow:
//   1. User clicks "Load User"
//   2. dispatch(fetchUser(2)) is called
//   3. Thunk middleware detects it's a function → calls fetchUser(2)(dispatch, getState)
//   4. fetchUser dispatches FETCH_USER_START → reducer sets loading: true
//   5. API call completes → fetchUser dispatches FETCH_USER_SUCCESS
//   6. Reducer sets loading: false, user: data
//   7. useSelector re-renders the component with the new state

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./actions_async";

const UserCom = () => {
  // dispatch — the store's dispatch function, enhanced by thunk middleware
  const dispatch = useDispatch();

  // useSelector — subscribes to the store; re-renders whenever selected state changes
  // state here is the full store shape: { user, loading, error }
  const { user, loading, error } = useSelector((state) => state);

  return (
    <div>
      <h2>Fetch User (Thunk)</h2>

      {/* Dispatching a thunk — fetchUser(2) returns a function, not an object */}
      <button onClick={() => dispatch(fetchUser(2))}>Load User</button>

      {/* Conditional rendering driven by the async state slices */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {user && (
        <table border="1">
          <tbody>
            <tr><td>Name</td>  <td>{user.name}</td></tr>
            <tr><td>Email</td> <td>{user.email}</td></tr>
            <tr><td>Phone</td> <td>{user.phone}</td></tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserCom;
