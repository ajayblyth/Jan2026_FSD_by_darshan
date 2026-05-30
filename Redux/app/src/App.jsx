import 'bootstrap/dist/css/bootstrap.min.css'
import './store'
import Account from './Account'
import Form from './Form'
function App() {
  return (
    <div className="container text-center mt-5">
      <Form />
      <Account />
    </div>
  )
}

export default App
