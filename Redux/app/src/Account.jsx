import React from "react";
import { useSelector } from "react-redux";
const Account = () => {
  let data = useSelector((state) => {
    return state.account;
  });


  let {transactions} = useSelector((state) => {
    return state.transactions;
  });

  return (
    <div>
      <h2>Account Details</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Field</th>
          </tr>{" "}
          <tr>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Full name</td>
            <td>{data.fullName}</td>
          </tr>
          <tr>
            <td>Mobile</td>
            <td>{data.mobile}</td>
          </tr>
          <tr>
            <td>Balance</td>
            <td>{data.balance}</td>
          </tr>
        </tbody>
      </table>

      <h2>Transactions</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          { transactions.length === 0 ? (
            <tr>
                <td colSpan="3">
                    No transactions yet
                </td>
            </tr>
          )
          :
          (transactions.map((t, i) => (
            <tr key={i}>
              <td>{t.amt}</td>
              <td>{t.type}</td>
              <td>{t.date}</td>
            </tr>
          )))}
        </tbody>
      </table>
    </div>
  );
};

export default Account;
