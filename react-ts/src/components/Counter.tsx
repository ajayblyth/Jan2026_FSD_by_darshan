import { useState } from "react";

// ============================================================
// TYPING useState
// ------------------------------------------------------------
// useState INFERS the type from the initial value:
//   useState(0)   -> number
//   useState("")  -> string
// Annotate explicitly <T>() when inference isn't enough — e.g.
// the value starts null, or an array that starts empty.
// ============================================================
interface User {
  name: string;
  age: number;
}

const Counter = () => {
  const [count, setCount] = useState(0);              // inferred: number
  const [name, setName] = useState("");               // inferred: string
  const [user, setUser] = useState<User | null>(null); // explicit: starts null
  const [items, setItems] = useState<string[]>([]);    // explicit: empty array
  return (
    <div>
      <h2>Counter</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <p>Name: {name || "(empty)"}</p>
      <button onClick={() => setName("Sam")}>Set name</button>
      <p>User: {user ? user.name : "no user yet"}</p>
      <button onClick={() => setUser({ name: "Priya", age: 25 })}>
        Load User
      </button>
      <p>Items: {items.join(", ") || "None"}</p>
      <button onClick={() => setItems([...items, `item ${items.length + 1}`])}>
        Add item
      </button>
    </div>
  );
};

export default Counter;
