import firebase from 'firebase';
import { ADD_TODO_SUCCESS, REMOVE_TODO_SUCCESS, FETCH_TODOS_SUCCESS, COMPLETE_TODO } from './types';
import _ from 'lodash';

export const addTodo = ({ projectName, todo }) => dispatch => {
    const { currentUser } = firebase.auth();

    console.log(todo);

    firebase.database().ref(`/users/${currentUser.uid}/todos/${projectName}`).push(todo).then(() => {

        dispatch({
            type: ADD_TODO_SUCCESS
        });

        console.log("Added todo: ", todo);
    });
}

export const removeTodo = ({ uid }) => dispatch => {
    const { currentUser } = firebase.auth();

    firebase.database().ref(`/users/${currentUser.uid}/todos/${uid}`).remove().then(() => {
        dispatch({
            type: REMOVE_TODO_SUCCESS
        });

        console.log("Removed todo");
    });
}

export const fetchProjects = () => dispatch => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            firebase.database().ref(`/users/${user.uid}/todos`).on('value', snapshot => {
                console.log("SNAPSHOT", snapshot.val());
                dispatch({ type: FETCH_TODOS_SUCCESS, payload: snapshot.val() || {} });
            });
        }
    });
}

export const completeTodo = ({ uid, projectName }) => dispatch => {
    const { currentUser } = firebase.auth();

    firebase.database().ref(`/users/${currentUser.uid}/todos/${projectName}/${uid}/completed`).set(true).then(() => {
        dispatch({
            type: COMPLETE_TODO
        });

        console.log("Completed todo");
    });
}
