import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
  render() {

      var tasksInVarinTaskList  = this.props.tasksInApp;
    
      var elemenstBuildTasks = tasksInVarinTaskList.map((task,index)=>{
          return <TaskItem 
                key = {task.id} 
                indexInTaskList={index} 
                taskInTaskList={task} 
                onUpdate={this.props.onUpdate}
                onRemove={this.props.onRemove}
                />
      });
    return (
    <div>
    <table className="table table-bordered table-hover">
            <thead>
                <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>
                        <input type="text" className="form-control" />
                    </td>
                    <td>
                        <select className="form-control">
                            <option value="-1">All</option>
                            <option value="0">Deactive</option>
                            <option value="1">Active</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                {elemenstBuildTasks}
            </tbody>
        </table>
    </div>
    );
  }
}

export default TaskList;
