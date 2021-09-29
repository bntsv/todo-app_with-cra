import React from 'react';

class AddTodo extends React.Component {
  constructor (props) {
    super(props);

    this.textInput = React.createRef();
  }

  // функцията focusInput() е копирана и не разбирам коментарите и какво е current... Целта е след натискане на Add бутона, да се фокусира полето за писане.
  focusInput = () => {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  }

  render(){
    return (
      <div>
        <form onSubmit = {this.props.addTodo}>
          <input 
          type="text" 
          placeholder="add new todo"
          autoFocus
          ref={this.textInput} 
          value = {this.props.pendingTodo.title} 
          onChange={this.props.newTodo}/>
          <button onClick={this.focusInput}>Add</button>
        </form>
      </div>
    );
  }
}


export default AddTodo;