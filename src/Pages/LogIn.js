import React, { useEffect } from 'react'
import '../Styles/Auth.css';

import { Link, useHistory } from "react-router-dom"

function LogIn (props){
    const history = useHistory();
    let regExp = /^[\w.+\-]+@gmail\.com$/

    const log_in = async function (email, password) {
        let url = "http://localhost:5000/api/authenticate/auth";
        let credentials = {
            'User_Email': email,
            'User_Password': password
        }
        
        if (!(email.match(regExp) && password != "")) {
            return props.logInError("Invalid email or password")
        }

        await fetch(url, { 
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type':'application/json' }
        }).then(response => {
            response.json().then((res) =>{
                if (res.success) {
                    props.logInSuccess(res.data, res.data.token);
                    history.push("/main")
                } else {
                    props.logInError(res.message);
                }
                
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        const handleEnter = (event) => {
           if (event.keyCode === 13) {
            log_in(document.getElementById('login_email').value, document.getElementById('login_password').value)
          }
        };
        window.addEventListener('keydown', handleEnter);
      }, []);

    return (
        <div className="log-in-container">
            <form className="auth-form">
                <div className="form-group">
                    <label htmlFor="login_email" className="whiteText">Email address</label>
                    <input  type="text"
                            placeholder="tom123@gmail.com"
                            className="form-control"
                            id="login_email" 
                            name="email"
                            value={props.email}
                            onChange={e => props.changeInput(e.target.value, e.target.name)}/>
                </div>
                <div className="form-group">
                    <label className="form-check-label whiteText" htmlFor="login_password">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="login_password"
                        name="password"
                        value={props.password}
                        onChange={e => props.changeInput(e.target.value, e.target.name)}/>
                </div>
                <input type="button" 
                        className="btn btn-info"
                        id="login_btn"
                        onClick={() => log_in(props.email, props.password)}
                        value="Continue"/>
                
                <hr className="hr-line"/>
                <div className="form-group">
                    <Link className="link" to="/signUp"><span>Sign up for an account</span></Link>
                </div>
                {!props.authCheck ? (
                                            <div className="alert alert-danger errorBlockShow">{props.errorMessage}</div>
                                        ) : null }  
            </form>
        </div>
    )
};


export default LogIn;