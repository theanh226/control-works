import React, { Component } from 'react';


class TaskForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            name : '',
            status: true
        };
      }
    

    closeFromInTaskForm =()=>{
        this.props.closeFrom();
    }

    

    onHandleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status'){
            value = target.value ==='true' ? true:false;
        }
        this.setState({
          [name]: value
        })
      }

      onHandleSubmitInTaskFrom = (event) =>{
        event.preventDefault(); 
        this.props.onHandleSubmit(this.state);
        this.onClear();
        this.closeFromInTaskForm();
      }

      onClear = () =>{
          this.setState({
            name : '',
            status: true
          })
          this.closeFromInTaskForm();
          console.log('somethings');
      }

  render() {
    return (
        <div>

            <div className="alert alert-warning">

                <div className="alert-heading">
                    <h3 className="alert-title text-fs-sm">Add new works
                    <span className="fa fa-times-circle-o close-icon-in-task-form"
                        onClick={this.closeFromInTaskForm}
                    ></span>
                    </h3>


                </div>

                <div className="alert-body">

                    <form onSubmit={this.onHandleSubmitInTaskFrom} >

                        <div className="form-group">
                            <label>Name :</label>
                            <input type="text"  className="form-control" onChange={this.onHandleChange} name="name"  />
                        </div>

                        <label>Status :</label>

                        <select className="form-control" onChange={this.onHandleChange} name="status" >
                            <option value={true}>Active</option>
                            <option value={false}>Deactive</option>
                        </select>
                        <br />

                        <div className="text-center">
                            <button type="submit" className="btn btn-success mr-1">Add </button>
                            <button type="button" className="btn btn-danger" onClick={this.onClear}>Cancel</button>
                        </div>

                    </form>
                    
                </div>
        </div>
    </div>
    );
  }
}

export default TaskForm;
