import { connect } from 'react-redux'
import { changeInput, logInSuccess, logInError } from '../Actions/ActionCreators'
import page from '../Pages/SignUp'

function mapStateToProps(state){
    return {
        authCheck: state.authCheck,
        errorMessage: state.auth.errorMessage
    }
}

function mapDispatchToProps(dispatch){
    return{
        changeInput: (value, name) => dispatch(changeInput(value, name)),
        logInSuccess: (user, token) => dispatch(logInSuccess(user, token)),
        logInError: (error) => dispatch(logInError(error))
    }
}

let func = connect( mapStateToProps, mapDispatchToProps);
const SignUpPage = func(page);

export default SignUpPage;