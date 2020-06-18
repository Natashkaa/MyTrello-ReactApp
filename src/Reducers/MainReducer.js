import * as type from '../Actions/ActionType'
import { logInSuccess, logInError } from '../Actions/ActionCreators'

const reducer = (state = {}, action) => {
    switch(action.type){
        case type.CHANGE_INPUT:
            return { 
                ...state,
                [action.fieldName]: action.value
            }
        default:
            return state;
    }
}

export default reducer;