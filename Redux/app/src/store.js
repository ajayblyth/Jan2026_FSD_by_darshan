import { createStore, combineReducers } from 'redux';

const initialState = {
    fullName: '',
    mobile: null,
    balance: 0,
}

const transInitialState ={
    transactions : [],
    nextId :1
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

function transReducer(state = transInitialState, action){
    switch (action.type){
        case 'ADD':
            return{
                ...state, 
                nextId: state.nextId + 1,
                transactions: [
                    ...state.transactions,
                    {
                        id: state.nextId,
                        amt: action.payload.amt,
                        type: action.payload.type,
                        date: action.payload.date,
                    }
                ]
            }
        default:
            return state
    }
}

const rootReducer =  combineReducers({
    account: accReducer,
    transactions: transReducer
})
const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&  window.__REDUX_DEVTOOLS_EXTENSION__()
)

// console.log('state: ', store.getState())
// store.({ type:dispatch "SET_PROFILE", payload: {fullName: "Sam", mobile: 98685876} })
// store.dispatch({ type: "DEPOSIT", payload: 500 })
// console.log('state: ', store.getState())
// store.dispatch({ type: "WITHDRAW", payload: 100 })
// console.log('state: ', store.getState())
// store.dispatch({ type: "RESET"})
// console.log('state: ', store.getState())

export default store;