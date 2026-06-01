// ─── Account Component ────────────────────────────────────────────────────────
// Pure read component — only consumes Redux state, never dispatches.
// Re-renders automatically whenever the selected slice of state changes.

import { useSelector } from "react-redux";

function Account() {
  // useSelector(selectorFn) — subscribes to the store.
  // The selector receives the full state tree; we pick only the slice we need.
  // state.user  → managed by userSlice  (keys set in configureStore's reducer map)
  // state.tnxs  → managed by tnxSlice
  // Using two separate useSelector calls is intentional: each one only triggers
  // a re-render when ITS slice changes, not on every store update.
  const { fullName, mobile, balance } = useSelector((state) => state.user);
  const { transactions }              = useSelector((state) => state.tnxs);
  return (
    <div className="container mt-4">
      <h2 className="text-primary">Account Details</h2>
      <table className="table table-bordered" style={{ width: "50%" }}>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Full Name</td>
            <td>{fullName}</td>
          </tr>
          <tr>
            <td>Mobile</td>
            <td>{mobile}</td>
          </tr>
          <tr>
            <td>Balance</td>
            <td>{balance}</td>
          </tr>
        </tbody>
      </table>

      <h2 className="mt-4">Transactions</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="3">No transactions yet</td>
            </tr>
          ) : (
            transactions.map((tx, i) => (
              <tr key={i}>
                <td>{tx.amount}</td>
                <td>{tx.type}</td>
                <td>{tx.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Account;
