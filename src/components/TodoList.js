import React from 'react';
import TodoItem from './TodoItem';

const todos = [
    {
        id: 1,
        title: "Todo1",
        completed: false
    },
    {
        id: 2,
        title: "Todo2",
        completed: false
    },
    {
        id: 3,
        title: "Todo3",
        completed: false
    }
];

function TodoList() {
    return (
        <ul>
            {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
        </ul>
    );
}

export default TodoList;