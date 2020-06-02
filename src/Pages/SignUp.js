import React from 'react'
import '../Styles/Auth.css';
import { Link } from "react-router-dom"

function SignUp(props){
    return (
    <div className="sign-up-container">
        <form>
            <div className="form-group">
                <label htmlFor="firstName" className="whiteText">First Name</label>
                <input  type="text"
                        placeholder="Tom"
                        className="form-control" 
                        id="firstName" 
                        name="fname"
                        value={props.fname}
                        onChange={e => props.changeInput(e.target.value, e.target.name)}></input>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="secondName" className="whiteText">Second Name</label>
                <input  type="text"
                        placeholder="Jerry"
                        className="form-control"
                        id="secondName" 
                        name="sName"
                        value={props.sname}
                        onChange={e => props.changeInput(e.target.value, e.target.name)}></input>
            </div>
            <div className="form-group">
                <label htmlFor="email" className="whiteText">Email address</label>
                <input  type="text"
                        placeholder="tom123@gmail.com"
                        className="form-control"
                        id="email" 
                        name="email"
                        value={props.email}
                        onChange={e => props.changeInput(e.target.value, e.target.name)}/>
            </div>
            <div className="form-group">
                <label className="form-check-label whiteText" htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password"
                       name="password"
                       value={props.password}
                       onChange={e => props.changeInput(e.target.value, e.target.name)}/>
            </div>
            <button type="submit" className="btn btn-info">Continue</button>
            <hr className="hr-line"/>
            <div className="form-group">
                <Link className="link" to="/logIn"><span>Already have an account? Log In</span></Link>
            </div>
        </form>
    </div>
    )
}

export default SignUp;