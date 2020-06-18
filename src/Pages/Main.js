import React from 'react'
import '../Styles/Main.css';
import { Link, useHistory } from "react-router-dom"

import user from '../imgs/user.png';
import exit from '../imgs/exit.png';

async function GetUser(id){
  let url = "http://localhost:5000/api/user/" + id;
  let response = await fetch(url)
  let jsn = await response.json();
  return jsn.data;
}

class MainPage extends React.Component{
  async componentWillMount(){
    if(!this.props.user){
      const user = await GetUser(window.localStorage.getItem('currentUserId'));
      this.props.updateUserInState(user);
    }
  }
  
  render () {
    return (
      <div className="mainPage-container">
        {this.props.user ? (
          <div>
            <div className="container-fluid body-container">

              <div className="row mainRow no-gutters">
              <div className="userCol pt-2">

                <div className="row p-0 m-0 iconRow">
                  <img src={user} className="userIcon"></img>
                </div>

                <div className="row p-0 m-0 userDataRow">
                  {this.props.user.user_FirstName}
                </div>

                <div className="row p-0 m-0 logoutRow">
                  <Link className="link" to="/signUp"><img src={exit} className="exitIcon"></img></Link>
                </div>
                
              </div>
              <div className="col-sm">

                <div className="row p-0 m-0 userDataRow">
                  {this.props.user.user_FirstName}
                </div>

                <div className="row p-0 m-0 logoutRow">
                  <Link className="link" to="/signUp"><img src={exit} className="exitIcon"></img></Link>
                </div>
              </div>
            </div>
              <div className="row footerRow no-gutters">
                <div className="col-sm">
                  <div className="alert alert-warning cl-sm" role="alert">
                    footer
                  </div>
                </div>
              </div>
            
            </div>

            {/* <div className="container-fluid footer-container">

              <div className="row footerRow no-gutters">
                <div className="col-sm">
                  <div className="alert alert-warning cl-sm" role="alert">
                    footer
                  </div>
                </div>
              </div>
          
            </div> */}
          </div>
          ) : 
          <div className="row notAuthrow">
            <div className="mainPageNotAuth-container">
              <div className="form-group">
                <Link className="link" to="/signUp"><span>Sign up</span></Link>
              </div>
              <div className="form-group link">or</div>
              <div className="form-group">
                <Link className="link" to="/logIn"><span>Log In</span></Link>
              </div>
            </div>
          </div>}  
      </div>
    )
  }
}





export default MainPage;