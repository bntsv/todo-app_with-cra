import React from 'react';

const clickHandler = (e) => {
  // console.dir(e.target);
}

function AddTodo() {
  return (
    <div>
      <input type="text" placeholder="add new todo" />
      <button onClick={clickHandler}>Add</button>
    </div>
  );
}

export default AddTodo;