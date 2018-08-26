import {
    combineReducers
} from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';


const rootReducer = combineReducers({
    tasks_list : tasks ,
    isDisplayForm // isDisplayForm: isDisplayForm(Ref)
});

export default rootReducer;