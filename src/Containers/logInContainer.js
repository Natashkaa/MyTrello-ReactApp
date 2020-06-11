import { connect } from 'react-redux'
import { changeInput, logIn } from '../Actions/ActionCreators'
import page from '../Pages/LogIn'

function mapStateToProps(state){
    return {
        email: state.email,
        password: state.password,
        authCheck: state.authCheck
    }
}

function mapDispatchToProps(dispatch){
    return{
        changeInput: (value, name) => dispatch(changeInput(value, name)),
        logIn: (email, password) => dispatch(logIn(email, password))
    }
}

let func = connect( mapStateToProps, mapDispatchToProps);
const LogInPage = func(page);

export default LogInPage;