// 'import type' brings in React only for its TYPES (the event types
// below), not any runtime value — it's erased after compile.
import type React from "react";

// ============================================================
// TYPING EVENTS
// ------------------------------------------------------------
// React has a typed event for each interaction. The generic is
// the HTML element the handler is attached to:
//   ChangeEvent<HTMLInputElement>  -> input's onChange (e.target.value)
//   FormEvent<HTMLFormElement>     -> form's onSubmit
//   MouseEvent<HTMLButtonElement>  -> button's onClick
// Correct typing gives autocomplete on e.target and e.preventDefault().
// ============================================================
const EventsDemo = () => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);   // .value is typed because element is HTMLInputElement
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();            // stop the page from reloading on submit
    console.log("Submitted");
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    console.log("clicked");
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Events</h2>
      <input onChange={handleChange} placeholder="type here..."></input>
      <button type="button" onClick={handleClick}>
        Click me
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EventsDemo;
