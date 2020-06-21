import { connect } from 'react-redux'
import { changeInput, updateUserInState, updateTasksInState, addTask, deleteTask, logOut } from '../Actions/ActionCreators'
import page from '../Pages/Main'

function mapStateToProps(state){
    return {
        user: state.auth.user,
        tasks: state.auth.tasks
    }
}

function mapDispatchToProps(dispatch){
    return{
        changeInput: (value, name) => dispatch(changeInput(value, name)),
        updateUserInState: (user) => dispatch(updateUserInState(user)),
        updateTasksInState: (tasks) => dispatch(updateTasksInState(tasks)),
        addTask: (task) => dispatch(addTask(task)),
        deleteTask: (id) => dispatch(deleteTask(id)),
        logOut: () => dispatch(logOut())
    }
}

let func = connect( mapStateToProps, mapDispatchToProps);
const MainPage = func(page);

export default MainPage;