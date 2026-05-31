import 'bootstrap/dist/css/bootstrap.min.css'
import './store'
import Account from './Account'
import Form from './Form'
import UserCom from './UserCom'
function App() {
  return (
    <div className="container text-center mt-5">
      {/* <Form />
      <Account /> */}
      <UserCom />
    </div>
  )
}

export default App
