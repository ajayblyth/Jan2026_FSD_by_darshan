import React, { useState } from "react";

// ============================================================
// PUTTING IT TOGETHER — props + state + events + a typed list
// ------------------------------------------------------------
// A controlled input: its value is driven by state (input), and
// onChange writes every keystroke back into state.
// names is typed string[] so .map() below is fully type-checked.
// ============================================================
interface NameListProps {
  title: string;
}
const NameList = ({ title }: NameListProps) => {
  const [input, setInput] = useState("");           // current textbox value
  const [names, setNames] = useState<string[]>([]); // the list we build up
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);                        // keep state in sync with input
  }
  function addName() {
    if (input.trim()) {                              // ignore empty / whitespace
      setNames([...names, input]);                   // new array (don't mutate state)
      setInput("");                                  // clear the box
    }
  }
  return (
    <div>
      <h2>{title}</h2>
      <input value={input} onChange={handleChange} placeholder="Add a name" />
      <button onClick={addName}>Add name</button>
      <ul>
        {/* render a list — each item needs a unique key prop */}
        {names.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </div>
  );
};

export default NameList;
