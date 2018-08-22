import {
  createStore
} from 'redux';

var initState = {
  status: false,
  sort: {
    by: "name",
    value: 1
  }
};
//USE SWITCH : CASE
// function todos(state = initState, action) {
//   switch (action.type) {
//     case 'TOGGLE_STATUS':
//        state.status = !state.status;
//        return state;
//     default:
//       return state
//   }
// }

var myReducer = (state = initState, action) => {
  if (action.type === "TOGGLE_STATUS") {
    state.status = !state.status;
  }
  if (action.type === "SORT") {
    var {
      by,
      value
    } = action.sort; // by = action.sort.by oder action.sort.value
    var {
      status
    } = state; // status = state.status

    return {
      status: status,
      sort: {
        by: by,
        value: value
      }
    };
    // if you save new state as do here. then state default also change and save with new value.
    // state.sort = {
    //     by: action.sort.by,
    //     value: action.sort.value
    // }
  }
  return state;
};

const store = createStore(myReducer);
console.log(store.getState());

//ACTION
var actionToggleStatus = {
  type: "TOGGLE_STATUS",
};
var sortAction = {
  type: "SORT",
  sort: {
    by: "name",
    value: -1
  }
};

//dispatch
store.dispatch(actionToggleStatus);
store.dispatch(sortAction);
console.log(store.getState());