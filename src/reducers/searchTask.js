import * as types from '../constants/ActionTypes';

const initialState = '';


var myReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.SEARCH_TABLE:
            return action.keywords;
        default:
            return state;
    }
}

export default myReducer;