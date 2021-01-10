import {createStore} from 'redux';
import appReducer from './Reducer';

const store = createStore(appReducer);

export default store;
