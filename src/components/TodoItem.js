import React from 'react';

function TodoItem(props) {
  return (
    <li >{props.todo.id}.{props.todo.title} 
    <button onClick = {()=>props.removeTodo(props.index)}>x</button>
    <button onClick = {()=>props.toggleCompleted(props.index)}>v</button>
    </li>
  );
}

export default TodoItem;