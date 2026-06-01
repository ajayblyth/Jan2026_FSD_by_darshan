// ─── Form Component ───────────────────────────────────────────────────────────
// Dispatches RTK action creators to update both slices (user + tnxs).
// Local useState controls the input fields; Redux state holds the "source of truth"
// that Account.jsx reads from — the two components never talk to each other directly.

import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateFullName,
  updateMobile,
  deposit,
  withdraw,
  reset,
} from "./userSlice";
import { addTnx, removeTnx, clearAll } from "./tnxslice";

function Form() {
  // Local UI state — only lives here, not needed by any other component
  const [amount, setAmount]     = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile]     = useState("");

  // useDispatch — gives us the store's dispatch function so we can send actions
  const dispatch = useDispatch();

  // Deposit: updates balance in userSlice AND appends a Credit record in tnxSlice.
  // Two dispatches = two separate slice updates in one user action.
  const handleDeposit = () => {
    dispatch(deposit(Number(amount)));
    dispatch(addTnx({
      amount: Number(amount),
      type: "Credit",
      date: new Date().toLocaleDateString(),
    }));
    setAmount("");
  };

  // Withdraw: same pattern — balance decreases + Debit record appended
  const handleWithdraw = () => {
    dispatch(withdraw(Number(amount)));
    dispatch(addTnx({
      amount: Number(amount),
      type: "Debit",
      date: new Date().toLocaleDateString(),
    }));
    setAmount("");
  };

  // Clears only the tnxSlice transactions array — does not touch userSlice
  const handleClearTransactions = () => {
    dispatch(clearAll());
  };

  // Updates only fullName in userSlice
  const handleUpdateName = () => {
    dispatch(updateFullName(fullName));
    setFullName("");
  };

  // Updates only mobile in userSlice
  const handleUpdateMobile = () => {
    dispatch(updateMobile(Number(mobile)));
    setMobile("");
  };

  // Resets all userSlice fields to initialState values (does not clear transactions)
  const handleReset = () => {
    dispatch(reset());
  };

  return (
    <div className="container mt-4">
      <h2>Account Form</h2>

      <div className="row mb-3">
        <div className="col">
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <div className="col">
          <button className="btn btn-primary me-2" onClick={handleDeposit}>
            Deposit
          </button>
          <button className="btn btn-danger" onClick={handleWithdraw}>
            Withdraw
          </button>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter full name"
          />
        </div>
        <div className="col">
          <button className="btn btn-primary" onClick={handleUpdateName}>
            Update Name
          </button>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <input
            type="number"
            className="form-control"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter mobile number"
          />
        </div>
        <div className="col">
          <button className="btn btn-primary" onClick={handleUpdateMobile}>
            Update Mobile
          </button>
        </div>
      </div>

      <button className="btn btn-danger mt-2" onClick={handleReset}>
        Reset
      </button>
      <button
        className="btn btn-secondary mt-2 ms-2"
        onClick={handleClearTransactions}
      >
        Clear History
      </button>
    </div>
  );
}

export default Form;
