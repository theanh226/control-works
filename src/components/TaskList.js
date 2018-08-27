import React, {
    Component
} from 'react';
import TaskItem from './TaskItem';
import {
    connect
} from 'react-redux';
import * as actions from './../actions/index';

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
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
        var filter = {
            name: name === 'filterName' ? value : this.state.filterName,
            status: name === 'filterStatus' ? value : this.state.filterStatus
        }
        this.props.onFilteTable(filter)
    }
    render() {
        var {
            tasks,
            filteRef,
            searchTask
        } = this.props;

        if (filteRef) {
            if (filteRef.name) {
                tasks = tasks.filter((tasks) => {
                    return tasks.name.toLowerCase().indexOf(filteRef.name) !== -1;
                })
            }
            tasks = tasks.filter((tasks) => {
                if (filteRef.status === -1) {
                    return tasks;
                } else {
                    return tasks.status === (filteRef.status === 1 ? true : false);
                }
            })
        }

        if(searchTask){
            tasks = tasks.filter( (tasks) => {
                return tasks.name.toLowerCase().indexOf(searchTask.toLowerCase()) !== -1;
            })
        }

        var {
            filterName,
            filterStatus
        } = this.state;

        var elemenstBuildTasks = tasks.map((task, index) => {
            return <TaskItem
            key = {
                index
            }
            indexInTaskList = {
                index
            }
            taskInTaskList = {
                task
            }
            />
        });

        // Search




        return (
        <div>
        <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">ID</th>
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

//Connect with store of Redux

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        filteRef: state.filteTable,
        searchTask: state.searchTask
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onFilteTable: (filter) => {
            dispatch(actions.filterTable(filter))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);