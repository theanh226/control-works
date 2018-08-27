import {
    combineReducers
} from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import editTaks from './editTaks';


const rootReducer = combineReducers({
    tasks_list : tasks ,
    isDisplayForm, // isDisplayForm: isDisplayForm(Ref)
    editTaks
});

export default rootReducer;