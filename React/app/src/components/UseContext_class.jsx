import React, { createContext, useState, useContext } from "react";

const UserContext = createContext(null);

function UserCard() {
  const { username, setUsername } = useContext(UserContext);
  return (
    <>
      <p>
        <strong>Hello, {username}</strong>
      </p>
      <button
        className="btn btn-primary btm-sm me-2"
        onClick={() => setUsername("Bob")}
      >
        Switch to Bob
      </button>
      <button
        className="btn btn-secondary btm-sm"
        onClick={() => setUsername("Sam")}
      >
        Switch to Sam
      </button>
    </>
  );
}

const UseContext_class = () => {
  const [username, setUsername] = useState("Sam");
  return (
    <div>
      <h3 className="text-info"> use Context with Objects </h3>
      <UserContext.Provider value={{ username, setUsername }}>
        <UserCard />
      </UserContext.Provider>
    </div>
  );
};

export default UseContext_class;
