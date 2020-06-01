import { connect } from 'react-redux'
import { changeInput } from '../Actions/ActionCreators'
import page from '../Pages/SignUp'

function mapStateToProps(state){
    return {
        fname: state.fname
    }
}

function mapDispatchToProps(dispatch){
    return{
        changeInput: (value, name) => dispatch(changeInput(value, name))
    }
}

let func = connect( mapStateToProps, mapDispatchToProps);
const SignUpPage = func(page);

export default SignUpPage;