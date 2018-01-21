import { ADD_TODO_SUCCESS, REMOVE_TODO_SUCCESS, FETCH_TODOS_SUCCESS, COMPLETE_TODO } from '../actions/types';

const INITIAL_STATE = { todos: {}, error: '' };

export default (state = INITIAL_STATE, action) => {
    console.log(action);

    switch (action.type) {
        case ADD_TODO_SUCCESS:
            return { ...state };
        case REMOVE_TODO_SUCCESS:
            return { ...state };
        case FETCH_TODOS_SUCCESS:
            return { ...state, todos: action.payload };
        case COMPLETE_TODO:
            return { ...state };
        default:
            return state;
    }
};
