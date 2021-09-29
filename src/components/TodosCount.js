import React from 'react';

function TodosCount(props) {
  return (
    <div>
      {props.todosLength}
    </div>
  );
}

export default TodosCount;