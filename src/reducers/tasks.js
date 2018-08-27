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

        case types.DELETE_TASK:
            var index = findIndex(state, action.id);
            state.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];



        case types.UPDATE_STATUS_TASK:
            index = findIndex(state, action.id);
            state[index] = {
                ...state[index], // copy task in this index
                status: !state[index].status // change status
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
            // state[index].status = !state[index].status; this's work, but can not building out view
            // var cloneTask ={...state[index]} // copy new object use Es6
            // cloneTask.status = !cloneTask.status;

            //method 1
            // state.splice(index,1);
            // state.push(cloneTask);

            //method 2
            // state[index] = cloneTask;

            //method 3
            // all function below return new task with new status

        case types.SAVE_TASK:

            var task = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status
            }
            if (!task.id) {
                task.id = randomstring.generate();
                state.push(task);
            } else {
                index = findIndex(state, task.id);
                state[index] = task;
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state]; // similar when we use map();

        default:
            return state
    }
}

export default myReducer;