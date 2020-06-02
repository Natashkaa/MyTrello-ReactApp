import React from 'react'
import '../Styles/Auth.css';

import { Link } from "react-router-dom"

function LogIn(props){
    return (
    <div className="log-in-container">
        <form>
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
                <Link className="link" to="/signUp"><span>Sign up for an account</span></Link>
            </div>
        </form>
    </div>
    )
}

export default LogIn;