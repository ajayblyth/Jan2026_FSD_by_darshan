import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deposit, setProfileAcc, addTnx } from "./actions";
const Form = () => {
  const [amount, setAmount] = useState("");
  const [withdraw, setWithdraw] = useState("");
  const [fullName, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [txnAmt, setTxnAmt] = useState("");
  const [txnType, setTxnType] = useState("credit");
  const [txnDate, setTxnDate] = useState("");

  const dispatch = useDispatch();
  const handleDeposit = (e) => {
    e.preventDefault();
    // dispatch({ type: "DEPOSIT", payload: Number(amount) });
    dispatch(deposit(amount));
    setAmount("");
  };
  const handleWithdraw = (e) => {
    e.preventDefault();
    dispatch({ type: "WITHDRAW", payload: Number(withdraw) });
    setWithdraw("");
  };
  const handleSetProfile = (e) => {
    e.preventDefault();
    // dispatch({
    //   type: "SET_PROFILE",
    //   payload: {
    //     fullName,
    //     mobile: Number(mobile),
    //   },
    // });
    dispatch(setProfileAcc(fullName, Number(mobile)));
    setFullname("");
    setMobile("");
  };

  const handleAddTnx = (e) => {
    e.preventDefault();
    dispatch(addTnx(Number(txnAmt), txnType, txnDate));
    setTxnAmt("");
    setTxnDate("");
  };
  return (
    <div>
      <form onSubmit={handleDeposit}>
        <h3>Deposit</h3>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amt"
        />
        <button type="submit">Deposit</button>
      </form>
      <form onSubmit={handleWithdraw}>
        <h3>withdraw</h3>
        <input
          type="number"
          value={withdraw}
          onChange={(e) => setWithdraw(e.target.value)}
          placeholder="Enter amt"
        />
        <button type="submit">Withdraw</button>
      </form>
      <form onSubmit={handleSetProfile}>
        <h3>SetProfile</h3>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullname(e.target.value)}
          placeholder="Enter Name"
        />
        <input
          type="number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Enter Mobile"
        />
        <button type="submit">Set Profile</button>
      </form>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>

      <form onSubmit={handleAddTnx}>
        <h2>Add Txns</h2>
        <input
          type="number"
          value={txnAmt}
          onChange={(e) => setTxnAmt(e.target.value)}
          placeholder="Enter Amt"
        />
        <select
          value={txnType}
          onChange={(e) => setTxnType(e.target.value)}
          placeholder="Select type"
        >
          <option value="credit">Credit</option>{" "}
          <option value="debit">Debit</option>
        </select>
        <input
          type="date"
          value={txnDate}
          onChange={(e) => setTxnDate(e.target.value)}
          placeholder="Enter Amt"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Form;
