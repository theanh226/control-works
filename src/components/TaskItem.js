import React, { Component } from 'react';


class TaskItem extends Component {


    onUpdate = () => {
        //console.log(this.props.taskInTaskList.id);
        this.props.onUpdate(this.props.taskInTaskList.id);
    }

    onRemove = () => {
        this.props.onRemove(this.props.taskInTaskList.id);
    }

    onUpdateTask = () => {
        this.props.onUpdateTask(this.props.taskInTaskList.id);
    }
    
  render() {
      var  {indexInTaskList,taskInTaskList} = this.props;
    return (
        <tr>
        <td className="align-baseline">{indexInTaskList + 1}</td>

        <td>{taskInTaskList.name}</td>

        <td className="text-center">
            <span className={taskInTaskList.status === true ? 'badge badge-success' : 'badge badge-secondary'} 
            onClick={this.onUpdate} >
            {taskInTaskList.status === true ? 'Active':'Deactive'}
            </span>
        </td>

        <td className="text-center d-flex justify-content-center">
            <button type="button" className="btn btn-warning"  onClick={this.onUpdateTask}>
                <span className="fa fa-pencil mr-2" ></span>Adjust
            </button>
            &nbsp;
            <button type="button" className="btn btn-danger" onClick={this.onRemove}>
                <span className="fa fa-trash mr-2"></span>Remove
            </button>
        </td>
        </tr>
    );
  }
}
export default TaskItem;

