import React from 'react'
import '../Styles/Auth.css';
import { Link } from "react-router-dom"

class Signup extends React.Component{
    state = {
        User_FirstName: "",
        User_LastName: "",
        User_PhotoPath: "",
        User_Email: "",
        User_Password: ""
    }
    
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        let regExp = /^[\w.+\-]+@gmail\.com$/
        if (!(this.state.User_Email.match(regExp) && this.state.User_Password != "")) {
            return this.props.logInError("Invalid email or password")
        }
        else{
        let res = await fetch("http://localhost:5000/api/user", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(this.state)
        });
        let jsn = await res.json();

        if (jsn.success) {
            this.props.logInSuccess(jsn.data, jsn.data.token);
            this.props.history.push("/main")
        } else {
            this.props.logInError("This email is already in use");
            }
        }
    }

    render(){
        return (
            <div className="sign-up-container">
                <form onSubmit={this.handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="User_FirstName" className="whiteText">First Name</label>
                        <input  type="text"
                                placeholder="Tom"
                                className="form-control" 
                                id="User_FirstName" 
                                name="User_FirstName"
                                value={this.state.User_FirstName}
                                onChange={this.handleChange}></input>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="User_LastName" className="whiteText">Second Name</label>
                        <input  type="text"
                                placeholder="Jerry"
                                className="form-control"
                                id="User_LastName" 
                                name="User_LastName"
                                value={this.state.User_LastName}
                                onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="User_Email" className="whiteText">Email address</label>
                        <input  type="text"
                                placeholder="tom123@gmail.com"
                                className="form-control"
                                id="User_Email" 
                                name="User_Email"
                                value={this.state.User_Email}
                                onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label className="form-check-label whiteText" htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="User_Password"
                               name="User_Password"
                               value={this.state.User_Password}
                               onChange={this.handleChange}/>
                    </div>
                    <input type="submit" className="btn btn-info"/>
                    <hr className="hr-line"/>
                    <div className="form-group">
                        <Link className="link" to="/logIn"><span>Already have an account? Log In</span></Link>
                    </div>
                    {!this.props.authCheck ? (
                                            <div className="alert alert-danger errorBlockShow">{this.props.errorMessage}</div>
                                        ) : null } 
                </form>
            </div>
            )
    }
}
  
export default Signup;