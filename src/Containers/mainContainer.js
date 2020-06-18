import { connect } from 'react-redux'
import { changeInput, updateUserInState } from '../Actions/ActionCreators'
import page from '../Pages/Main'

function mapStateToProps(state){
    return {
        user: state.auth.user
    }
}

function mapDispatchToProps(dispatch){
    return{
        changeInput: (value, name) => dispatch(changeInput(value, name)),
        updateUserInState: (user) => dispatch(updateUserInState(user))
    }
}

let func = connect( mapStateToProps, mapDispatchToProps);
const MainPage = func(page);

export default MainPage;