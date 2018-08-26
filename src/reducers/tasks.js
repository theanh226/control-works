import * as types from '../constants/ActionTypes';
import randomstring from 'randomstring';


var data = JSON.parse(localStorage.getItem('tasks'));
const initialState = data ? data : [];
var findIndex = (tasks, id) => {
    var result = -1;
    tasks.forEach((task, index) => {
        if (id === task.id) {
            result = index
        }
    });
    return result;
}

var myReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.LIST_ALL:
            return state;

        case types.UPDATE_STATUS_TASK:
            console.log(action);
            var index = findIndex(state,action.id);
            // state[index].status = !state[index].status; this's work, but can not building out view
            // var cloneTask ={...state[index]} // copy new object use Es6
            // cloneTask.status = !cloneTask.status;
            
            //method 1
            // state.splice(index,1);
            // state.push(cloneTask);
            //method 2
            // state[index] = cloneTask;
            //method 3
            state[index] = {
                ...state[index],
                status : !state[index].status
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];


        case types.ADD_TASK:

            var newTask = {
                id: randomstring.generate(),
                name: action.task.name,
                status: action.task.status === 'true' ? true : false
            }
            console.log(newTask);
            state.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state]; // similar when we use map();

        default:
            return state
    }
}

export default myReducer;