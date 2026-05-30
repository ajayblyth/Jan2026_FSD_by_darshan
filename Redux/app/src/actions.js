// Action creators - simple function -> returns action obj

export const deposit = (amount) => ({
    type: 'DEPOSIT',
    payload: amount
})

export const setProfileAcc = (fullName, mobile) => ({
    type: "SET_PROFILE",
    payload: {fullName, mobile}
})

export const addTnx = (amt, type, date) => ({
    type: "ADD",
    payload: {amt, type, date}
})