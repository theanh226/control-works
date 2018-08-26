import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
class TaskForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            id:'',
            name : '',
            status: true
        };
      }
    

    closeFromInTaskForm =()=>{
        this.props.onCloseForm();
    }

 
    componentWillMount = () => {
        // Thực hiện một số tác vụ, hàm này chỉ thực hiện 1 lần duy nhất
       if(this.props.taskEditTranfser){
        this.setState({
            id: this.props.taskEditTranfser.id,
            name: this.props.taskEditTranfser.name,
            status: this.props.taskEditTranfser.status
        })

       }
    }

    componentWillReceiveProps = (nextProps) => {
    // Hàm này thực hiện liên tục mỗi khi props thay đổi
    // (1) Sử dụng để thay đổi trạng thái (state) của component phụ thuộc props
    // (2) Sử dụng các kết quả, khởi tạo biến có tính chất async. Ví dụ: Khởi tạo Google Map Api, đây là quá trình async,
    // do vậy, bạn không thể biết được khi nào khởi tạo xong, thì khi khởi tạo xong có thể truyền xuống component thông qua
    // props, và từ đó bạn có thể khởi tạo các dịch vụ khác.
        if(nextProps && nextProps.taskEditTranfser){
         this.setState({
             id: nextProps.taskEditTranfser.id,
             name: nextProps.taskEditTranfser.name,
             status: nextProps.taskEditTranfser.status
         })
        }
        else if(!nextProps.taskEditTranfser){
            console.log('Adjust -> Add');
            this.setState({
                id:'',
                name : '',
                status: true
            })
        }
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
        // this.props.onHandleSubmit(this.state);
        this.props.onAddTask(this.state);
        this.onClear();
        this.closeFromInTaskForm();
      }

      onClear = () =>{
          this.setState({
            name : '',
            status: true
          })
          this.closeFromInTaskForm();
      }


  render() {

    var {id} = this.state;

    return (
         
        <div>

            <div className="alert alert-warning">

                <div className="alert-heading">
                    <h3 className="alert-title text-fs-sm">{id !== '' ? 'Update Works':'Add new work'}
                    <span className="fa fa-times-circle-o close-icon-in-task-form"
                        onClick={this.closeFromInTaskForm}
                    ></span>
                    </h3>


                </div>

                <div className="alert-body">

                    <form onSubmit={this.onHandleSubmitInTaskFrom} >

                        <div className="form-group">
                            <label>Name :</label>
                            <input type="text"  className="form-control" onChange={this.onHandleChange} name="name" 
                             value={this.state.name}/>
                        </div>

                        <label>Status :</label>

                        <select className="form-control" onChange={this.onHandleChange} name="status" 
                         value={this.state.status}>
                            <option value={true}>Active</option>
                            <option value={false}>Deactive</option>
                        </select>
                        <br />

                        <div className="text-center">
                            {/* {id !== '' ? {updateBtn}:{addBtn}} */}
                            <button 
                            type="submit"
                            className="btn btn-success mr-1" >
                            {id !== '' ? 'Update':'Add'}</button>
                            <button type="button" className="btn btn-danger" onClick={this.onClear}>Cancel</button>
                        </div>

                    </form>
                    
                </div>
        </div>
    </div>
    );
  }
}

// const mapStateToProps = (state) => {
//     return {
//         tasks: state.tasks_list
//     }
// }

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAddTask: (taskRef) => { // onAddTask you can  set random name for this , this need referen input as task, because we want add new task to our list
            dispatch(actions.addTask(taskRef));
        },
        onCloseForm: () =>{
            dispatch(actions.closeForm())
        },
    }
} 

export default connect(null,mapDispatchToProps)(TaskForm);

