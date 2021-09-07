import React from 'react';

function TodoItem(props) {
  return (
    <li >{props.todo.id}.{props.todo.title} <span>X</span></li>
  );
}

export default TodoItem;