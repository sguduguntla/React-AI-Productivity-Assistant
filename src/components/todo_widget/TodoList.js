import React from 'react';
import Todo from './Todo';
import _ from 'lodash';

const TodoList = ({ project }) => {

    console.log("Project LENGTH", project.length);

    return _.map(project, (todo) => {
        
        return (
            <Todo key={todo.uid} todo={todo} />
        );
    });
    
};

export default TodoList;
