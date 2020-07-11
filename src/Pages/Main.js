import React from 'react'
import '../Styles/Main.css';
import { Link, useHistory } from "react-router-dom"

import user from '../imgs/user.png';
import exit from '../imgs/exit.png';
import twitter from '../imgs/social/twitter.png';
import instagram from '../imgs/social/instagram.png';
import facebook from '../imgs/social/facebook.png';

import TaskComponent from '../Components/taskComponent';

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

async function GetUser(id){
  let url = "http://localhost:5000/api/user/" + id;
  let response = await fetch(url)
  let jsn = await response.json();
  return jsn.data;
}
async function GetTasks(id, count){
  let url = "http://localhost:5000/api/task/userTasks/" + id + "/" + count;
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
    this.handleModalChange = this.handleModalChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.makeArchiveTask = this.makeArchiveTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.state = {
      newTask: {
        Task_Priority: "important",
        Task_Name: "",
        Task_Description: "",
        UserId: 0,
        IsArchived: "false"
      },
      editedTask: {
        TaskId: 0,
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
      },
      decrement: 0,
      increment: 1,
      canDecrement: false,
      canIncrement: true,
      showModal: false
      // tasks : []
    }
    
  }
  
  async componentWillMount(){
    if(!this.props.user){
      const user = await GetUser(window.localStorage.getItem('currentUserId'));
      if(user) {
        const fetchTasks = await GetTasks(window.localStorage.getItem('currentUserId'), this.state.increment);
        await this.props.updateTasksInState(fetchTasks);
        this.props.updateUserInState(user);
        if(fetchTasks.length < 4){
          this.setState({
            canDecrement: false,
            canIncrement: false
          });
        }
        else{
          this.setState({
            canDecrement: true,
            canIncrement: true
          });
        }
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

  handleModalChange = event => {
    this.setState({
      editedTask: { ...this.state.editedTask,
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
    let url = "http://localhost:5000/api/task/addTask";
    let token = window.localStorage.getItem("mytrellocredentials");
    try{
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
          this.setState({
            canDecrement: false,
            canIncrement: true,
            increment: 1,
            decrement: 0
          });
          const fetchTasks = await GetTasks(window.localStorage.getItem('currentUserId'), this.state.increment);
          await this.props.updateTasksInState(fetchTasks);
          this.setState({
            newTask: {...newTask,
                      Task_Name: "",
                      Task_Description: "",
                      IsArchived: "false"}
          });
        }
      }
    }catch(err){
      window.location.href="logIn"
    }
  }

  handleCloseModal = event => {
    event.preventDefault();
    this.setState({
      showModal: false
    });
  }

  async handleIncrement () {
    if(this.state.canIncrement){
        const fetchTasks = await GetTasks(window.localStorage.getItem('currentUserId'), this.state.increment + 1);
        if(fetchTasks.length == 4){
          this.setState({
            canDecrement: true,
            canIncrement: true,
            increment: ++this.state.increment,
            decrement: ++this.state.decrement
          });
        }
        else{
          this.setState({
            canDecrement: true,
            canIncrement: false,
            increment: ++this.state.increment,
            decrement: ++this.state.decrement
          });
        }
        this.props.updateTasksInState(fetchTasks);
    };
  }

  async handleDecrement () {
    if(this.state.decrement > 0){
      const fetchTasks = await GetTasks(window.localStorage.getItem('currentUserId'), this.state.decrement);
      if(fetchTasks.length == 4){
        this.setState({
          canDecrement: true,
          canIncrement: true,
          increment: this.state.increment - 1,
          decrement: this.state.decrement - 1
        });
      }
      else{
        this.setState({
          canDecrement: false,
          canIncrement: true
        });
      }
      this.props.updateTasksInState(fetchTasks);
    };
  }

  deleteTask = async taskId => {
    let url = "http://localhost:5000/api/task/deleteTask/" + taskId;
    let token = window.localStorage.getItem("mytrellocredentials");
    try{
      if(token){
        let response = await fetch(url, {
          method: 'DELETE',
          headers: { 
            'Authorization': `bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        let jsn = await response.json();
        if(jsn.data){
          const fetchTasks = await GetTasks(window.localStorage.getItem('currentUserId'), this.state.increment);
          await this.props.updateTasksInState(fetchTasks);
        }
      }
    }catch(err){
      window.location.href="logIn"
    }
  }
  makeArchiveTask = async taskId =>{
    let url = "http://localhost:5000/api/task/updateTask/" + taskId;
    let token = window.localStorage.getItem("mytrellocredentials");
    try{
      if(token){
        let getOneTaskURL = "http://localhost:5000/api/task/getOne/" + taskId;
        let updatedTask = await fetch(getOneTaskURL, {
          method: "GET",
          headers: {
            'Authorization': `bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }).then(x => x.json()).then(d => d.data);

        updatedTask.Task_Priority = "archive";
        updatedTask.IsArchived = true;

        let response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(updatedTask),
          headers: {
            'Authorization': `bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        let jsn = await response.json();
        if(jsn.data){
          const fetchTasks = await GetTasks(window.localStorage.getItem('currentUserId'), this.state.increment);
          await this.props.updateTasksInState(fetchTasks);
        }
      }
    }catch(err){
      window.location.href="logIn"
    }
  }
  updateTask = taskForEdit => {
    this.setState({
      editedTask: {...this.state.editedTask,
                TaskId: taskForEdit.taskId,
                Task_Priority: taskForEdit.task_Priority,
                Task_Name: taskForEdit.task_Name,
                Task_Description: taskForEdit.task_Description,
                UserId: taskForEdit.userId,
                IsArchived: taskForEdit.isArchived},
      showModal: true
    });
  }
  saveEditTask = async () => {
    let url = "http://localhost:5000/api/task/updateTask/" + this.state.editedTask.TaskId;
    let token = window.localStorage.getItem("mytrellocredentials");
    try{
      if(token){
        await fetch(url, {
          method: "PUT",
          body: JSON.stringify(this.state.editedTask),
          headers: {
            'Authorization': `bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const fetchTasks = await GetTasks(window.localStorage.getItem('currentUserId'), this.state.increment);
        await this.props.updateTasksInState(fetchTasks);
        this.setState({
          showModal: false
        });
      }
    }catch(err){
       window.location.href="logIn"
    }  
  }
    
  render () {
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
                <div className="row p-3 m-0 allTasksRow">
                  <div className="inc-decr-btn-container col-sm-12 col-md-1 col-lg-1">
                    <input type="button" className="btn btn-active btn-left test-btn" value="&laquo;" onClick={this.handleDecrement}></input>
                    <input type="button" className="btn btn-active btn-up" value="&uArr;" onClick={this.handleDecrement}></input>
                  </div>
                  {this.props.tasks.map( task => <TaskComponent key={task.taskId} 
                                                              date={task.task_CreateDate}
                                                              priority={task.task_Priority}
                                                              name={task.task_Name}
                                                              description={task.task_Description}
                                                              onChange={this.handleTasks}
                                                              deleteBtn={() => {this.deleteTask(task.taskId)}}
                                                              archiveBtn={() => {this.makeArchiveTask(task.taskId)}}
                                                              editBtn={() => {this.updateTask(task)}}></TaskComponent>)}
                  <div className="inc-decr-btn-container col-sm-12 col-md-1 col-lg-1">
                    <input type="button" className="btn btn-active btn-right" value="&raquo;" onClick={this.handleIncrement}></input>
                    <input type="button" className="btn btn-active btn-bot" value="&dArr;" onClick={this.handleIncrement}></input>
                    </div>
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
          {/* MODAL */}
          <Modal show={this.state.showModal}>
          <Modal.Header>
            <Modal.Title>
            <div className="form-group">
                  <select value={this.state.editedTask.Task_Priority} 
                          className="form-control priorityList" 
                          id="Task_Priority" 
                          name="Task_Priority" 
                          onChange={this.handleModalChange}>
                    <option style={{backgroundColor: this.state.priority.important}} 
                            value="important">important</option>
                    <option style={{backgroundColor: this.state.priority.not_important}} 
                            value="not_important">not important</option>
                  </select>
                </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="form-group">
              <label htmlFor="task_Name" className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-8 col-md-8 col-lg-12 ml-1">
                  <input type="text"
                          className="form-control" 
                          id="Task_Name" 
                          name="Task_Name"  
                          value={this.state.editedTask.Task_Name}
                          onChange={this.handleModalChange}/>
                </div>
            </div>
            <div className="form-group">
              <label htmlFor="Task_Description" className="col-sm-2 col-form-label">About</label>
                <div className="col-sm-8 col-md-8 col-lg-12 ml-1">
                  <input type="text"
                          className="form-control" 
                          id="Task_Description" 
                          name="Task_Description" 
                          value={this.state.editedTask.Task_Description}
                          onChange={this.handleModalChange}/>
                </div>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.saveEditTask}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal> 
    </div>
    )
  }
}





export default MainPage;