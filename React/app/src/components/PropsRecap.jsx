import React from 'react'

function Greeting({name}){
    return <h4>Hello, {name}</h4>
}

const PropsRecap = () => {
    const name = "Nithin"
  return (
    <div>
        <h3>Props Recap </h3>
        <Greeting name={name} />
    </div>
  )
}

export default PropsRecap