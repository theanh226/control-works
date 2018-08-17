import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import randomstring from 'randomstring';


class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            tasks: [],// id, unique, name , status
            displayFrom:false,
             
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
        this.setState({
            // if(this.state.displayFrom === true){
            //     this.setState({displayFrom:false});
            // }else{
            //     this.setState({displayFrom:true});
            // }
            displayFrom: !this.state.displayFrom

        })
    }

    closeFrom = () => {
      this.setState({displayFrom:false});
    }

    onSubmitInApp = (data)=>{
        data.id = randomstring.generate();

      var newTask = this.state.tasks;
    newTask.push(data);
      this.setState({tasks: newTask});
      localStorage.setItem('tasks',JSON.stringify(newTask));
      console.log(this.state.tasks);
    }

    onUpdate = (updateID) => {
        var taskUpdate = this.state.tasks;
        var index = this.findIndex(updateID);
        console.log(index);
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


  render() {

    // var tasksList = this.state.tasks;
   var tasksList = this.state.tasks; 
   var {displayFrom} = this.state;
   var showTaskFrom = displayFrom === true ? <TaskForm closeFrom={this.closeFrom} onHandleSubmit={this.onSubmitInApp} />:'';

    return (
  <div className="container">
      <div className="text-center">
          <h2>Control Works</h2>
          <hr/>
      </div>
      <div className="row">

          <div className={ displayFrom ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4':''}>
                {showTaskFrom}
          </div>

          <div className={this.state.displayFrom ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8':'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                <button type="button" className="btn btn-success" onClick={this.openTaskFrom}>
                    <span className="fa fa-plus mr-2"></span>Add new work
                </button>
                <button type="button" className="btn btn-danger ml-2" onClick={this.onGenerateData}>
                    Generate Data
                </button>
                <div className="Control">
                        <Control />
                </div>
                <div className="row mt-2">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <TaskList tasksInApp={tasksList} onUpdate={this.onUpdate}/>
                    </div>
                </div>
          </div>
      </div>
  </div>    
    );
  }
}

export default App;
