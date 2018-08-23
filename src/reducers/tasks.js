import * as types from '../constants/ActionTypes';
import randomstring from 'randomstring';


var data = JSON.parse(localStorage.getItem('tasks'));
const initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.LIST_ALL:
            return state;

        case types.ADD_TASK:

        var newTask = {
            id: randomstring.generate(),
            name: action.task.name,
            status: action.task.status === 'true' ? true:false
        }
        state.push(newTask);
        localStorage.setItem('tasks',JSON.stringify(state));
        return [...state]; // similar when we use map();

        default:
            return state
    }
}

export default myReducer;