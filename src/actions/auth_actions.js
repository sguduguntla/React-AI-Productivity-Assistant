import firebase from 'firebase';
import { LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER, CREATE_USER_FAIL } from './types';

export const createUser = ({ displayName, email, password }, callback) => dispatch => {
    dispatch({
        type: LOGIN_USER
    });

    firebase.auth().createUserWithEmailAndPassword(email, password).then(user => createUserSuccess(dispatch, user, displayName, callback)).catch(() => createUserFail(dispatch));
}

export const loginUser = ({ email, password }, callback) => {
    return dispatch => {
        dispatch({
            type: LOGIN_USER
        });

        firebase.auth().signInWithEmailAndPassword(email, password).then(user => loginUserSuccess(dispatch, user, callback)).catch(() => {
            loginUserFail(dispatch);
        });
    };
};

export const authenticateUser = ({ user }, callback) => {
    return dispatch => {
        dispatch({
            type: LOGIN_USER
        });

        loginUserSuccess(dispatch, user, callback);
    };
};

const loginUserFail = (dispatch) => {
    dispatch({
        type: LOGIN_USER_FAIL
    });
};

const createUserFail = (dispatch) => {
    dispatch({
        type: CREATE_USER_FAIL
    });
};

const createUserSuccess = (dispatch, user, displayName, callback) => {
    user.updateProfile({
        displayName
    }).then(() => {
        console.log(user);
        dispatch({ type: LOGIN_USER_SUCCESS, payload: user })
        callback();
    });

}

const loginUserSuccess = (dispatch, user, callback) => {
    dispatch({ type: LOGIN_USER_SUCCESS, payload: user });

    callback();
};
