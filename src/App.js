import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import randomstring from 'randomstring';
import Demo from './trainning/Demo';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            tasks: [],// id, unique, name , status
            displayFrom:false,
            taskEdit: null,
            filter : {
                name :'',
                status: -1
            },
            keyword:''
        }
    }

    componentWillMount(){
        if(localStorage && localStorage.getItem('tasks')){
            var todos = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks :todos
            })
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
        if(this.state.displayFrom && this.state.taskEdit !== null) {
            this.setState({
                displayFrom: true,
                taskEdit:null
    
            })
        }
        else{
            this.setState({
                displayFrom: !this.state.displayFrom,
                taskEdit:null
    
            })
        }

    }

    closeFrom = () => {
      this.setState({displayFrom:false});
    }

    showFrom = () => {
        this.setState({displayFrom:true});
    }

    onSubmitInApp = (data)=>{
        var newTask = this.state.tasks;
        if(data.id === ''){
            data.id = randomstring.generate();
            newTask.push(data);
        }
        else{
            var index = this.findIndex(data.id);
            newTask[index] = data;
        }
        
        this.setState({
            tasks: newTask,
            taskEdit:null
        });
        localStorage.setItem('tasks',JSON.stringify(newTask));
    }

    onUpdate = (updateID) => {
        var taskUpdate = this.state.tasks;
        var index = this.findIndex(updateID);
        if(index !== -1){
            taskUpdate[index].status =  !taskUpdate[index].status ;
            this.setState({
                tasks:taskUpdate
            })
            localStorage.setItem('tasks',JSON.stringify(taskUpdate));
        }
    }

    
    findIndex = (id) => {
        var result = -1;
        var taskSearch = this.state.tasks;
        taskSearch.forEach((task,index)=>{
            if(id === task.id){
                result = index
            }
        });
        return result;
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
       //console.log(filterStatusParse + '  ' + typeof filterStatusParse);
    } 

    onSearch = (key) => {
        this.setState({
            keyword:key.toLowerCase()
        })
        //console.log(this.state.keyword);
    }


  render() {

    // var tasksList = this.state.tasks;
   var tasksList = this.state.tasks; 
   var {displayFrom, taskEdit, filter,keyword} = this.state;
   if(filter){
       if(filter.name){
           tasksList = tasksList.filter((tasks)=>{
               return tasks.name.toLowerCase().indexOf(filter.name) !== -1;
           })
       }
       tasksList = tasksList.filter((tasks)=>{
           if(filter.status === -1){
               return tasksList;
           }
           else{
             return tasks.status === (filter.status === 1 ? true:false);
           }
       })
   }

   if(keyword){
    tasksList = tasksList.filter((tasks)=>{
        return tasks.name.toLowerCase().indexOf(keyword) !== -1;
    })
   }
   var showTaskFrom = displayFrom === true ? <TaskForm 
                                                closeFrom={this.closeFrom} 
                                                onHandleSubmit={this.onSubmitInApp} 
                                                taskEditTranfser={taskEdit} 
                                            />:'';

    return (
  <div className="container">
      <div className="text-center">
          <h2>Control Works</h2>
          <hr/>
      </div>
      <div className="row">

          <div className={ displayFrom ? 'col-xs-12 col-sm-12 col-md-4 col-lg-4':''}>
                {showTaskFrom}
          </div>

          <div className={this.state.displayFrom ? 'col-xs-12 col-sm-12 col-md-8 col-lg-8':'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
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
                            tasksInApp={tasksList} 
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

export default App;

