import {
    combineReducers
} from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import editTaks from './editTaks';
import filteTable from './filterTable';
import searchTask from './searchTask';


const rootReducer = combineReducers({
    tasks ,
    isDisplayForm, // isDisplayForm: isDisplayForm(Ref)
    editTaks,
    filteTable,
    searchTask
   
});
export default rootReducer;