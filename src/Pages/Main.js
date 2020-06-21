import React from 'react'
import '../Styles/Main.css';
import { Link, useHistory } from "react-router-dom"

import user from '../imgs/user.png';
import exit from '../imgs/exit.png';
import twitter from '../imgs/social/twitter.png';
import instagram from '../imgs/social/instagram.png';
import facebook from '../imgs/social/facebook.png';

import TaskComponent from '../Components/taskComponent';

async function GetUser(id){
  let url = "http://localhost:5000/api/user/" + id;
  let response = await fetch(url)
  let jsn = await response.json();
  return jsn.data;
}
async function GetTasks(id){
  let url = "http://localhost:5000/api/task/userTasks/" + id;
  let token = window.localStorage.getItem("mytrellocredentials");
  try{
    if(token){
        let response = await fetch(url, {
        method: 'GET',
        headers: { 
          'Authorization': `bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      let jsn = await response.json();
      return jsn.data;
    }
  }
  catch(err){
    window.location.href="logIn"
  }
}

class MainPage extends React.Component{
  constructor(props){
    super(props);
    this.handleTasks = this.handleTasks.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      newTask: {
        Task_Priority: "important",
        Task_Name: "",
        Task_Description: "",
        UserId: 0,
        IsArchived: "false"
      },
      priority: {
        important: "rgb(253, 112, 112)",
        not_important: "rgb(112, 253, 171)",
        archive: "rgb(171, 182, 171)"
      }
      // tasks : []
    }
    
  }
  
  async componentWillMount(){
    if(!this.props.user){
      const user = await GetUser(window.localStorage.getItem('currentUserId'));
      if(user) {
        const fetchTasks = await GetTasks(window.localStorage.getItem('currentUserId'));
        await this.props.updateTasksInState(fetchTasks);
        this.props.updateUserInState(user);
      
      }
      this.setState({
        newTask: { ...this.state.newTask,
                    UserId: window.localStorage.getItem('currentUserId')
                  }
      });
      
    }
  }

  handleChange = event => {
    this.setState({
      newTask: { ...this.state.newTask,
                  [event.target.name]: event.target.value
                }
    });
  }

  handleTasks = event => {
    this.setState({
      newTask: { ...this.state.newTask,
                  [event.target.name]: event.target.value
                }
    }); 
  }

  handleSubmit = async event => {
    event.preventDefault();
    console.log("old tasks length  " + this.props.tasks.length);

    let url = "http://localhost:5000/api/task/addTask";
    let token = window.localStorage.getItem("mytrellocredentials");
    if(token){
      let response = await fetch(url, {
        method: 'POST', 
        body: JSON.stringify(this.state.newTask),
        headers: { 
          'Authorization': `bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      let jsn = await response.json();
      let newTask = jsn.data;
      if(newTask){
        // this.setState({
        //   tasks: { ...this.state.tasks,
        //               newTask
        //             }
        // }); 
        let tmpTasks = [ ...this.props.tasks, newTask ];
        this.props.updateTasksInState(tmpTasks);
        console.log("new tasks length  " + tmpTasks.length);
      }
    }
  }
    
  render () {
    console.log("render tasks length  " + this.props.tasks.length);
    return (
      <div className="mainPage-container p-0 m-0">
        {this.props.user ? (
          <div>
            <div className="container-fluid m-0 p-0 body-container">

              <div className="row mainRow no-gutters row-cols-1">
              <div className="userCol col-lg-1 col-sm-12 col-xs-12 pt-2">

                <div className="row p-0 m-0 iconRow">
                  <img src={user} className="userIcon"></img>
                </div>

                <div className="row p-0 m-0 userDataRow">
                  {this.props.user.user_FirstName}
                </div>

                <div className="row p-0 m-0 logoutRow">
                  <Link className="link" to="/logIn" onClick={this.props.logOut}><img src={exit} className="exitIcon"></img></Link>
                </div>
                
              </div>
              <div className="col col-sm-12 col-md-12 col-lg-11 p-0">
              {/* create new task */}
              <div className="row p-0 m-0 newTaskRow p-3">
                <form onSubmit={this.handleSubmit} className="newTaskForm">
                <div className="form-group">
                  <label htmlFor="Task_Priority">· New Task ·</label>
                  <select value={this.state.newTask.Task_Priority} 
                          className="form-control priorityList" 
                          id="Task_Priority" 
                          name="Task_Priority" 
                          onChange={this.handleChange}>
                    <option style={{backgroundColor: this.state.priority.important}} 
                            value="important">important</option>
                    <option style={{backgroundColor: this.state.priority.not_important}} 
                            value="not_important">not important</option>
                  </select>
                </div>
                <div className="form-group row">
                  <label htmlFor="Task_Name" className="col-sm-2 col-form-label">Name</label>
                  <div className="col-sm-8 col-md-8 col-lg-12 ml-1">
                    <input type="text"
                          className="form-control" 
                          id="Task_Name" 
                          name="Task_Name"  
                          value={this.state.newTask.Task_Name}
                          onChange={this.handleChange}/>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="Task_Description" className="col-sm-2 col-form-label">About</label>
                  <div className="col-sm-8 col-md-8 col-lg-12 ml-1">
                    <input type="text"
                          className="form-control" 
                          id="Task_Description" 
                          name="Task_Description" 
                          value={this.state.newTask.Task_Description}
                          onChange={this.handleChange}/>
                  </div>
                </div>
              <input type="submit" className="btn btn-info" value="Save"/>
              </form>
              </div>
              {this.props.tasks ? (
                <div className="row p-0 m-0 allTasksRow">
                  <input type="button" className="btn btn-light" value="&laquo;"></input>
                  {this.props.tasks.map( task => <TaskComponent key={task.taskId} 
                                                              date={task.task_CreateDate}
                                                              priority={task.task_Priority}
                                                              name={task.task_Name}
                                                              description={task.task_Description}
                                                              onChange={this.handleTasks}
                                                              deleteBtn={() => {this.props.deleteTask(task.taskId)}}></TaskComponent>)}
                  <input type="button" className="btn btn-light" value="&raquo;"></input>
                </div>
              ) : null}
              </div>
            </div>
              <div className="row footerRow no-gutters">
                <div className="col col-xs-6">
                    <a href="https://twitter.com/" target="_blank"><img src={twitter} className="socialIcon"></img></a>
                    <a href="https://www.instagram.com/" target="_blank"><img src={instagram} className="socialIcon"></img></a>
                    <a href="https://www.facebook.com/" target="_blank"><img src={facebook} className="socialIcon"></img></a>               
                </div>
                <div className="col link col-xs-6">
                  © 2020 enot.com · Made in Kiev (Ukrain)
                </div>
              </div>
                
            </div>
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