import React from 'react'
import '../Styles/Main.css';
import { Link, useHistory } from "react-router-dom"

async function GetUser(id){
  let url = "http://localhost:5000/api/user/" + id;
  let response = await fetch(url)
  let jsn = await response.json();
  return jsn.data;
}

class MainPage extends React.Component{
  async componentWillMoun(){
    if(!this.props.user){
      const user = await GetUser(window.localStorage.getItem('currentUserId'));
      this.props.updateUserInState(user);
    }
  }
  
  render () {
    return (
      <div className="log-in-container container">
        {this.props.user ? (
          <div className="row">
            <div className="alert alert-warning" role="alert">
              Hello, {this.props.user.user_FirstName} {this.props.user.user_LastName}
            </div>
          </div>
          ) : 
          <div className="row">
            <div></div>
            <div className="form-group">
              <Link className="link" to="/signUp"><span>Sign up</span></Link>
            </div>/
            <div className="form-group">
              <Link className="link" to="/logIn"><span>Log In</span></Link>
            </div>
          </div>}  
      </div>
    )
  }
}





export default MainPage;