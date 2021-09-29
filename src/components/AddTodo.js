import React from 'react';

class AddTodo extends React.Component {
  constructor (props) {
    super(props)
    
  }

  render(){
    return (
      <div>
        <form onSubmit = {this.props.addTodo}>
          <input 
          type="text" 
          placeholder="add new todo" 
          value = {this.props.pendingTodo.title} 
          onChange={this.props.newTodo}/>
          <button>Add</button>
        </form>
      </div>
    );
  }
}


export default AddTodo;