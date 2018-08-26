import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import randomstring from 'randomstring';
import { connect } from 'react-redux';
import * as actions from './actions/index';


class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            
            taskEdit: null,
            filter : {
                name :'',
                status: -1
            },
            keyword:''
        }
    }



    onGenerateData = () => {
        var todos = [
            {
            id: randomstring.generate(),
            name :'Go to Swim',
            status: true
           },
           {
            id: randomstring.generate(),
            name :'Go to Sleep',
            status: true
           },
           {
            id: randomstring.generate(),
            name :'Go to Shopping',
            status: false
           },
        ]
       this.setState({
           tasks: todos
       })
       localStorage.setItem('tasks',JSON.stringify(todos));
    }

    openTaskFrom = () =>{
        this.props.onToggleForm();
        console.log(this.props.getDisplayFormInStore)

    }


    showFrom = () => {
        this.setState({displayFrom:true});
    }


    onRemove =(id)=>{
         var taskUpdate = this.state.tasks;
         var index = this.findIndex(id);
         if(index !== -1){
            taskUpdate.splice(index,1);
            this.setState({
                tasks:taskUpdate
            })
            localStorage.setItem('tasks',JSON.stringify(taskUpdate));
        }
        this.closeFrom();
    }


    onUpdateTask = (id) =>{
        var {tasks} = this.state;
        var index = this.findIndex(id);
        var editRef = tasks[index]; 
        this.setState({
            taskEdit:editRef
        })
        this.showFrom();
    }

    onFilter  = (filterName,filterStatus) => {
        var filterStatusParse = parseInt(filterStatus,10);
        this.setState({
            filter:{
                name:filterName.toLowerCase(),
                status:filterStatusParse
            }
        })
    } 

    onSearch = (key) => {
        this.setState({
            keyword:key.toLowerCase()
        })
        //console.log(this.state.keyword);
    }


  render() {

    // var tasksList = this.state.tasks;
//    var tasksList = this.state.tasks; 
   var {
    //    displayFrom,
        taskEdit,
    //  filter,
    //  keyword
    } = this.state;
//    if(filter){
//        if(filter.name){
//            tasksList = tasksList.filter((tasks)=>{
//                return tasks.name.toLowerCase().indexOf(filter.name) !== -1;
//            })
//        }
//        tasksList = tasksList.filter((tasks)=>{
//            if(filter.status === -1){
//                return tasksList;
//            }
//            else{
//              return tasks.status === (filter.status === 1 ? true:false);
//            }
//        })
//    }

//    if(keyword){
//     tasksList = tasksList.filter((tasks)=>{
//         return tasks.name.toLowerCase().indexOf(keyword) !== -1;
//     })
//    }
    var {getDisplayFormInStore} = this.props;
   var showTaskFrom = getDisplayFormInStore === true ? <TaskForm taskEditTranfser={taskEdit} />:'';

    return (
  <div className="container">
      <div className="text-center">
          <h2>Control Works</h2>
          <hr/>
      </div>
      <div className="row">

          <div className={ getDisplayFormInStore ? 'col-xs-12 col-sm-12 col-md-4 col-lg-4':''}>
                {showTaskFrom}
          </div>

          <div className={getDisplayFormInStore === true ? 'col-xs-12 col-sm-12 col-md-8 col-lg-8':'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                <button type="button" className="btn btn-success" onClick={this.openTaskFrom}>
                    <span className="fa fa-plus mr-2"></span>Add new work
                </button>
                <button type="button" className="btn btn-danger ml-2" onClick={this.onGenerateData}>
                    Generate Data
                </button>
                <div className="Control">
                        <Control onSearch={this.onSearch} />
                </div>
                <div className="row mt-2">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <TaskList 
                            // tasksInApp={tasksList} 
                            onUpdate={this.onUpdate}
                            onRemove={this.onRemove}
                            onUpdateTask={this.onUpdateTask}
                            onFilter={this.onFilter}
                        />
                    </div>
                </div>
          </div>
      </div>
  </div>    
    );
  }
}


const mapStateToProps = (state) => {
    return {
        getDisplayFormInStore : state.isDisplayForm //isDisplayFrom is in store
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onToggleForm: () =>{
            dispatch(actions.toggleForm())
        },
        onOpenForm: () =>{
            dispatch(actions.openForm())
        }
    }
} 



export default connect(mapStateToProps,mapDispatchToProps)(App);

