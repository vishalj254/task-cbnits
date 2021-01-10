import store from './store';
import {ADD_TODO, DELETE_TODO} from './types';

export function addTodo(key, value) {
  store.dispatch({
    type: ADD_TODO,
    payload: [key, value],
  });
}

export function deleteTodo(key) {
  store.dispatch({
    type: DELETE_TODO,
    payload: key,
  });
}

export function updateTodo(key, value) {
  store.dispatch({
    type: ADD_TODO,
    payload: [key, value],
  });
}

export function completeTodo(key, value) {
  store.dispatch({
    type: ADD_TODO,
    payload: [key, value],
  });
}

export function uncompleteTodo(key, value) {
  return {
    type: ADD_TODO,
    payload: [key, value],
  };
}
