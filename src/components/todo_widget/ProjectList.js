import React from 'react';
import Todo from './Todo';
import _ from 'lodash';
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';

const ProjectList = ({ projects }) => {

    return _.map(projects, (project) => {

        console.log("MYYY PROJECT", project);
        
        return (
            <div>
                <TodoHeader key={project.uid} headerText={project[0].projectName} />
                <TodoList project={project} />
            </div>
        );
    });
    
};

export default ProjectList;
