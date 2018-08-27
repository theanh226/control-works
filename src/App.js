import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index';


class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            keyword:''
        }
    }

    openTaskFrom = () =>{
        this.props.onOpenForm();
        this.props.onClearTask({
            id:'',
            name: '',
            status:false
        })

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
    }


  render() {
  var {getDisplayFormInStore} = this.props;
   var showTaskFrom = getDisplayFormInStore === true ? <TaskForm /> :'';

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
                <div className="Control">
                        <Control/>
                </div>
                <div className="row mt-2">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <TaskList />
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
        },
        onClearTask: (task) => {
            dispatch(actions.editTask(task));
        }
    }
} 



export default connect(mapStateToProps,mapDispatchToProps)(App);

