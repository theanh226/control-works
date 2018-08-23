import {
    combineReducers
} from 'redux';
import tasks from './tasks';


const rootReducer = combineReducers({
    tasks_list : tasks 
});

export default rootReducer;