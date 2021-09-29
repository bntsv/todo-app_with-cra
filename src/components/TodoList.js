import React from 'react';
import TodoItem from './TodoItem';

function TodoList(props) {
    return (
        <ul>
            {props.todosArr.map((todo, index) => 
            <TodoItem 
            key={todo.id} 
            index={index} 
            todo={todo} 
            removeTodo = {props.removeTodo} 
            toggleCompleted = {props.toggleCompleted} />)}
        </ul>
    );
}

export default TodoList;