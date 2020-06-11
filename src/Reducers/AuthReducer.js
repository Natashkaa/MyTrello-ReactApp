import * as type from '../Actions/ActionType'

let regExp = /^[\w.+\-]+@gmail\.com$/

const reducer = (state, action) => {
    switch(action.type){
        case type.CHANGE_INPUT:
            return { ...state,
                     [action.fieldName]: action.value
                    }
        case type.LOG_IN:
            if(action.email.match(regExp) && action.password != "")
            {
                return { ...state,
                    authCheck: true
                }
            }
            else{
                return { ...state,
                    authCheck: false
                }
            }
            
        default:
            return state;
    }
}

export default reducer;