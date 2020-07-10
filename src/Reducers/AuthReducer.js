import * as type from '../Actions/ActionType'

const reducer = (state = {}, action) => {
    switch(action.type){
        case type.CHANGE_INPUT:
            return { 
                ...state,
                [action.fieldName]: action.value
            }
        case type.LOG_IN_SUCCESS:
            window.localStorage.setItem('mytrellocredentials', action.token);
            window.localStorage.setItem('currentUserId', action.user.userId);
            return { 
                ...state,
                user: action.user,
                authCheck: true,
                errorMessage: null
            }
        case type.LOG_IN_ERROR:
            return { 
                ...state,
                authCheck: false,
                errorMessage: action.error
            }
        case type.LOG_OUT:
            window.localStorage.removeItem("mytrellocredentials");
            window.localStorage.removeItem("currentUserId")
            return{
                ...state,
                user: null,
                authCheck: true,
                errorMessage: null
            }
        case type.UPDATE_USER_IN_STATE:
            return { 
                ...state,
                user: action.user
            }
        case type.UPDATE_TASKS_IN_STATE:
            return { 
                ...state,
                tasks: action.tasks
            }
        case type.DELETE_TASK:
            return { 
                ...state,
                taskId: action.taskId
            }
        default:
            return state;
    }
}

export default reducer;