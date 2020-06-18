import * as types from './ActionType'

export function changeInput(value, name){
    return {
        type: types.CHANGE_INPUT,
        fieldName: name,
        value: value
    }
}

export function logInSuccess(user, token){
    return{
        type: types.LOG_IN_SUCCESS,
        user: user,
        token: token
    }
}
export function logInError(error){
    return{
        type: types.LOG_IN_ERROR,
        error: error
    }
}
export function updateUserInState(user){
    return{
        type: types.Update_User_In_State,
        user: user
    }
}