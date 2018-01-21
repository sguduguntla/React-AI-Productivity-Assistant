import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import AuthReducer from './auth_reducer';
import TodoReducer from './todo_reducer';
import DashboardReducer from './dashboard_reducer';

const rootReducer = combineReducers({
    auth: AuthReducer,
    todo: TodoReducer,
    dashboard: DashboardReducer
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;
