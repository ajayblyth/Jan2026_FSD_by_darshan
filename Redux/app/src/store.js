import { createStore } from 'redux';

const initialState = {
    fullName: '',
    mobile: null,
    balance: 0,
}

function accReducer(state = initialState, action) {
    switch (action.type) {
        case 'DEPOSIT':
            return {
                ...state, balance: state.balance + action.payload
            };        
        case 'WITHDRAW':
            return {
                ...state, balance: state.balance - action.payload
            };
        case 'SET_PROFILE':
            return {
                ...state, fullName: action.payload.fullName, mobile:  action.payload.mobile
            }
        case 'RESET':
            return initialState
        default:
            return state
    }
}

const store = createStore(accReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&  window.__REDUX_DEVTOOLS_EXTENSION__()
)

console.log('state: ', store.getState())
store.dispatch({ type: "SET_PROFILE", payload: {fullName: "Sam", mobile: 98685876} })
store.dispatch({ type: "DEPOSIT", payload: 500 })
console.log('state: ', store.getState())
store.dispatch({ type: "WITHDRAW", payload: 100 })
console.log('state: ', store.getState())
store.dispatch({ type: "RESET"})
console.log('state: ', store.getState())