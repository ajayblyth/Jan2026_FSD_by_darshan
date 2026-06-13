// ============================================================
// TYPING PROPS
// ------------------------------------------------------------
// Describe the props with an interface. age? is optional, so
// <Greetings name="Sam" /> is valid; name is required.
// Passing a wrong type (age="x") is a compile error.
// ============================================================
interface GreetingProps {
    name: string;
    age?: number
}

// Destructure the typed props in the parameter list.
const Greetings = ({ name, age }: GreetingProps) => {
  return (
    <h1>
        Hello {name}
        {age ? `, age ${age}` : ""}   {/* show age only if it was passed */}
    </h1>
  )
}

export default Greetings