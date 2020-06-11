import * as types from './ActionType'

export function changeInput(value, name){
    return {
        type: types.CHANGE_INPUT,
        fieldName: name,
        value: value
    }
}
export function signUp(){
    //
}
export function logIn(email, password){
    return{
        type: types.LOG_IN,
        email: email,
        password: password
    }
}