import { LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER, CREATE_USER_FAIL } from '../actions/types';

const INITIAL_STATE = { user: null, error: '', loading: false };

export default (state = INITIAL_STATE, action) => {
    console.log(action);

    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case LOGIN_USER_FAIL:
            return { ...state, error: 'Invalid username or password.', loading: false };
        case CREATE_USER_FAIL:
            return { ...state, error: 'An error occurred. Please try again.', loading: false };
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        default:
            return state;
    }
};
