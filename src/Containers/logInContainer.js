import { connect } from 'react-redux'
import { changeInput } from '../Actions/ActionCreators'
import page from '../Pages/LogIn'

function mapStateToProps(state){
    return {
        email: state.email,
        password: state.password
    }
}

function mapDispatchToProps(dispatch){
    return{
        changeInput: (value, name) => dispatch(changeInput(value, name))
    }
}

let func = connect( mapStateToProps, mapDispatchToProps);
const LogInPage = func(page);

export default LogInPage;