import React, { use } from "react";
// APP -> Layout -> Page -> UserCard 

function UserCard({ username }) {
  return (
    <p>
      <strong>Logged in as: {username}</strong>
    </p>
  );
}

function Page({ username }) {
  return <UserCard username={username} />;
}

function Layout({ username }) {
  return <Page username={username} />;
}
const PropDrilling = () => {
  const username = "Ajay";
  return (
    <div>
      <h3>PropDrilling</h3>
      <Layout username={username} />
    </div>
  );
};

export default PropDrilling;
