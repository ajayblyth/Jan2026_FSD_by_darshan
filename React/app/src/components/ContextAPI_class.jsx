// 3 pieces:
//  1. createContext - create the Channel 

import { createContext, useContext } from "react";

const UserContext = createContext(null)



function UserCard() {
  const username =  useContext(UserContext)
  return (
     <p>
      <strong>Logged in as: {username}</strong>
    </p>
  );
}

function Page() {
  return <UserCard  />;
}

function Layout() {
  return <Page />;
}

function test(){
    return "Hi"
}
const ContextAPI_class = () => {
  const username = "Ajay";
  return (
    <div>
      <h3>ContextAPI_class</h3>
      <UserContext.Provider value={username}>
          <Layout />
      </UserContext.Provider>

    </div>
  );
};



export default ContextAPI_class