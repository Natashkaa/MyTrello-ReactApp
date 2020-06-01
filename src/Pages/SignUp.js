import React from 'react'
import '../Styles/Auth.css';

function SignUp(props){
    return (
    <div className="sign-up-container">
        <form>
            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
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
                <label htmlFor="secondName">Second Name</label>
                <input  type="text"
                        placeholder="Jerry"
                        className="form-control"
                        id="secondName" 
                        name="sName"
                        value={props.sname}
                        onChange={e => props.changeInput(e.target.value, e.target.name)}></input>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input  type="text"
                        placeholder="tom123@gmail.com"
                        className="form-control"
                        id="email" 
                        name="email"
                        value={props.email}
                        onChange={e => props.changeInput(e.target.value, e.target.name)}></input>
            </div>
            <div className="form-group form-check">
                <label className="form-check-label" htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password"
                       name="password"
                       value={props.password}/>
                    
            </div>
            <button type="submit" className="btn btn-primary">Continue</button>
        </form>
    </div>
    )
}

export default SignUp;