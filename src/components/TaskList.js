import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {

    constructor(props){
        super(props);
        this.state = {
            filterName : '',
            filterStatus: -1 // all : -1 , active: 1, deactive: 0
        }
    }

    onChangeTaskList = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        this.setState({
            [name]: value
        })

        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus);
    } 
  render() {

    var tasksInVarinTaskList  = this.props.tasksInApp;
    var {filterName,filterStatus} = this.state;
    var elemenstBuildTasks = tasksInVarinTaskList.map((task,index)=>{
        return <TaskItem 
            key = {task.id} 
            indexInTaskList={index} 
            taskInTaskList={task} 
            onUpdate={this.props.onUpdate}
            onRemove={this.props.onRemove}
            onUpdateTask={this.props.onUpdateTask}
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
                        <input type="text" 
                        className="form-control"
                        name="filterName"
                        value={filterName}
                        onChange = {this.onChangeTaskList}
                         />
                    </td>
                    <td>
                        <select className="form-control" name="filterStatus"
                        value={filterStatus}
                        onChange = {this.onChangeTaskList}>
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

