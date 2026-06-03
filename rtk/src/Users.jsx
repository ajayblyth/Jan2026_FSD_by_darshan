// ─── Users Component ──────────────────────────────────────────────────────────
// Consumes the usersSlice state and triggers the createAsyncThunk action.
//
// Data flow when "Load Users" is clicked:
//   1. dispatch(fetchUsers())
//        → RTK dispatches "users/fetchUsers/pending"   → status = 'loading'
//   2. payloadCreator runs (fetch API call)
//   3a. On success → "users/fetchUsers/fulfilled"      → status = 'completed', users = data
//   3b. On failure → "users/fetchUsers/rejected"       → status = 'error', error = message
//   4. useSelector re-runs → component re-renders with new state

import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from './usersSlice'

function Users() {
    const dispatch = useDispatch()

    // dispatch(fetchUsers()) sends the thunk to the store.
    // The thunk middleware (built into configureStore) calls the payloadCreator.
    const handleLoad = () => {
        dispatch(fetchUsers())
    }

    // Three separate selectors — each re-renders only when its own value changes.
    // state.users is the slice key set in configureStore's reducer map.
    const users  = useSelector((state) => state.users.users)
    const status = useSelector((state) => state.users.status)
    const error  = useSelector((state) => state.users.error)

    // Guard clauses based on the status string enum from usersSlice initialState.
    // Returning early here keeps the main JSX clean and avoids nested conditionals.
    if (status === 'loading') {
        return <p className='text-center mt-4'>Loading...</p>
    }
    if (status === 'error') {
        return <p className='text-danger text-center mt-4'>{error}</p>
    }
    return (
        <div className="container mt-4">
            <h2 className="text-primary text-center">User Data — Using RTK</h2>
            <div className="text-center mb-3">
                <button className="btn btn-primary" onClick={handleLoad}>Load Users</button>
            </div>
            <table className="table table-bordered" style={{ width: '75%', margin: 'auto' }}>
                <thead>
                    <tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th></tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users
