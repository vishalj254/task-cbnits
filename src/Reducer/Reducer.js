import {ADD_TODO, DELETE_TODO} from './types';

/* eslint-disable no-new-object */
const initialState = {
  todo: new Object(),
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      state.todo[action.payload[0]] = action.payload[1];
      return {
        todo: state.todo,
      };

    case DELETE_TODO:
      delete state.todo[action.payload];
      return {
        todo: state.todo,
      };

    default:
      return state;
  }
}

export default rootReducer;
