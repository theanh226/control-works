import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';


class TaskItem extends Component {


    onUpdate = () => {
        this.props.onUpdateStatus(this.props.taskInTaskList.id);
    }

    onRemove = () => {
        this.props.onDeleteTask(this.props.taskInTaskList);
        this.props.onCloseFomr();
    }

    onUpdateTask = () => {
        this.props.onOpenForm();
        this.props.onEditTask(this.props.taskInTaskList);
        
    }
    
  render() {
      var  {indexInTaskList,taskInTaskList} = this.props;
    return (
        <tr>
        <td className="align-baseline">{indexInTaskList + 1}</td>

        <td>{taskInTaskList.name}</td>

        <td className="text-center">
            <span className={taskInTaskList.status === true ? 'badge badge-success' : 'badge badge-secondary'} onClick={this.onUpdate} >
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



const mapStateToProps = (state) => {
    return {
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onUpdateStatus: (id) =>{
            dispatch(actions.updateStatus(id))
        },
        onDeleteTask :(id) =>{
            dispatch(actions.deleteTask(id))
        },
        onCloseFomr : ()=>{
            dispatch(actions.closeForm())
        },
        onToggleForm: ()=>{
            dispatch(actions.toggleForm());
        },
        onOpenForm: () =>{
            dispatch(actions.openForm());
        },
        onEditTask: (task) => {
            dispatch(actions.editTask(task))
        }
    }
} 


export default connect(mapStateToProps,mapDispatchToProps)(TaskItem);


