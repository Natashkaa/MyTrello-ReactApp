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
export function logOut(){
    return{
        type: types.LOG_OUT
    }
}
export function updateUserInState(user){
    return{
        type: types.UPDATE_USER_IN_STATE,
        user: user
    }
}
export function updateTasksInState(tasks){
    return{
        type: types.UPDATE_TASKS_IN_STATE,
        tasks: tasks
    }
}
export function addTask(task){
    return{
        type: types.ADD_TASK,
        task: task
    }
}
export function deleteTask(id){
    return{
        type: types.DELETE_TASK,
        taskId: id
    }
}