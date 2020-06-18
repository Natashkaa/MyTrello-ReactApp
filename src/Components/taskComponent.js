import React, { useState } from 'react'

import archive from '../imgs/archive.png'
import del from '../imgs/delete.png'
import edit from '../imgs/edit.png'

function taskComponent(props){
    // const [done, setDone] = useState(false);
    let priority = {
        important: "rgb(253, 112, 112)",
        not_important: "rgb(112, 253, 171)",
        archive: "rgb(171, 182, 171)"
      }
      let newDate = props.date.toString();
      //newDate.substr(newDate.length - 8, 8); 
    return (
        <div className="taskItem">
            <div class="card">
                <div class="card-header">
                    <div className="priorityColor" style={{backgroundColor: priority[props.priority]}}></div>
                    <div className="date">{newDate.substr(0,10)}</div>
                </div>
                <div class="card-body">
                    <h5 class="card-title">{props.name}</h5>
                    <p class="card-text">{props.description}</p>
                </div>
                <div class="card-footer">
                    <button class="btn"><img src={edit} className="task-btn-icon"></img></button>
                    <button class="btn "><img src={archive} className="task-btn-icon"></img></button>
                    <button class="btn"><img src={del} className="task-btn-icon"></img></button>
                </div>
            </div>
        </div>
    )
}

export default taskComponent; 