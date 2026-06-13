// Root component — composes the four demo components.
// Each child is typed: e.g. Greetings REQUIRES a name prop,
// and age must be a number — TS checks this at the call site below.
import Counter from "./components/Counter";       // typed useState
import EventsDemo from "./components/EventsDemo"; // typed events
import Greetings from "./components/Greetings";   // typed props
import NameList from "./components/NameList";     // props + state + list

const App = () => {
  return (
    <div style={{ fontFamily: "san-serif", padding: 24, lineHeight: 1.5 }}>
      <h1>React + TS demos</h1>
      <Greetings name="Sam" age={30} />  {/* name required, age optional number */}
      <hr />
      <Counter />
      <hr />
      <EventsDemo />
      <hr />
      <NameList title="My names" />
    </div>
  );
};

export default App;
